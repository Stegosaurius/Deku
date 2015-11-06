(function() {
  'use strict';

  angular.module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$stateParams', '$window', 'jwtHelper', 'User'];

  function ProfileController($stateParams, $window, jwtHelper, User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.about = '';
    vm.activeUser = false;  // is user viewing his/her own profile?
    vm.addStatus = addStatus;
    vm.avatar = '';
    vm.deleteStatus = deleteStatus;
    vm.follow = follow;
    vm.followees = [];
    vm.followers = [];
    vm.getUsersForTag = getUsersForTag;
    vm.isFollowing = false;  // is active user following the user of this profile?
    vm.location = '';
    vm.photos = [];
    vm.currentPhotos = [];
    vm.photoIndex = 0;
    vm.morePhotos = true;
    vm.lessPhotos = false;
    vm.likeStatus = likeStatus;
    vm.getNextPhoto = getNextPhoto;
    vm.getPrevPhoto = getPrevPhoto;
    vm.recentThreadNames = [];
    vm.recentThreads = {};
    vm.statuses = [];
    vm.tags = [];
    vm.tagModalData = [];
    vm.unfollow = unfollow;
    vm.username = $stateParams.username;

    checkActiveUser();
    getProfile();

    ///////////////////////
    /// SCOPE FUNCTIONS ///
    ///////////////////////

    // post status to database and clear form
    function addStatus() {
      var newStatus = vm.status;
      // reset form
      vm.statusUpdate.$setPristine();
      vm.status = '';
      vm.statuses.unshift({ status: newStatus });

      User.addStatus(newStatus, User.getID())
        .then(function(status) {
          vm.statuses[0] = status;
          vm.statuses[0].timestamp = moment(vm.statuses[0].timestamp).fromNow();
        })
        .catch(function(err) {
          vm.statuses.shift();
        });
    }

    // remove status from database
    function deleteStatus(statusID) {
      User.deleteStatus(statusID);

      for (var i = 0; i < vm.statuses.length; i++) {
        if (vm.statuses[i].id === statusID) {
          vm.statuses.splice(i, 1);
          break;
        }
      }
    }

    function likeStatus(status, index) {
      var userID = User.getID();
      User.likeStatus(userID, status.id) 
        .then(function (statusCode) {
          if (statusCode === 201) {
            if (userID === status.user_id) {
              vm.statuses[index].vote_tally++;
              vm.statuses[index].votedFor = true;
            } else {
              vm.followeesStatuses[index].vote_tally++;
              vm.followeesStatuses[index].votedFor = true;
            }
          }
        });

    }

    // make the active user a follower of this profile's user
    function follow() {
      User.follow(User.getID(), vm.username);
      vm.isFollowing = true;
    }

    function getUsersForTag(tagname) {
      User.getUsersForTag(tagname)
        .then(function (data) {
          vm.tagModalData = [];
          for (var i = 0; i < data.length; i++) {
            var userObj = {
              profile_photo: data[i].profile_photo,
              username: data[i].username,
              location: data[i].location
            };
            vm.tagModalData.push(userObj);
          }
        });
    }

    function unfollow() {
      User.unfollow(User.getID(), vm.username);
      vm.isFollowing = false;
    }

    function getNextPhoto () {
      vm.photoIndex = vm.photoIndex + 1;
      if (vm.photoIndex === vm.photos.length - 1) {
        vm.currentPhotos = [vm.photos[vm.photoIndex]];
        vm.morePhotos = false;
      } else {
        vm.currentPhotos = vm.photos.slice(vm.photoIndex, vm.photoIndex + 2);
      }
      vm.lessPhotos = true;
    }

    function getPrevPhoto () {
      vm.photoIndex = vm.photoIndex - 1;
      vm.currentPhotos = vm.photos.slice(vm.photoIndex, vm.photoIndex + 2);
      if (vm.photoIndex === 0) {
        vm.lessPhotos = false;
      }
      vm.morePhotos = true;
    }

    ///////////////////////////
    /// NON-SCOPE FUNCTIONS ///
    ///////////////////////////

    // return true if the active user is viewing his/her own profile
    function checkActiveUser() {
      // checking token is more secure than checking localStorage.username
      var user = jwtHelper.decodeToken($window.localStorage.token).username;
      vm.activeUser = user === $stateParams.username;
    }

    function getProfile() {
      User.getProfile(vm.username)
        .then(function(data) {
          vm.about = data.about || 'Talk a little about yourself...';
          vm.location = data.location || 'Where are you?';
          getTags();
          getStatuses();
          getFolloweesStatuses();
          getFollowers();
          getRecentThreads();
          getAvatar();
          getPhotos();
        });
    }

    function getTags() {
      User.getTags(vm.username)
        .then(function(tags) {
          for (var i = 0; i < tags.length; i++) {
            vm.tags.push(tags[i].tag);
          }
        });
    }

    function getFollowers() {
      User.getFollowers(vm.username)
        .then(function(data) {
          vm.followers = data;

          // check whether active user is following this user
          if (!vm.activeUser) {
            for (var i = 0; i < vm.followers.length; i++) {
              if (vm.followers[i].username === $window.localStorage.username) {
                vm.isFollowing = true;
                break;
              }
            }
          }
        });

      User.getFollowees(vm.username)
        .then(function(data) {
          vm.followees = data;
        });
    }

    // store thread names for listing on page
    // make obj so thread id can be referenced from thread name
    function getRecentThreads() {
      User.getRecentThreads(vm.username)
        .then(function(threads) {
          vm.recentThreads = threads;
          // transform timestamp to readable format
          for (var i = 0; i < vm.recentThreads.length; i++) {
            vm.recentThreads[i].created_at = moment(vm.recentThreads[i].created_at).fromNow();
          }
        });
    }

    function getStatuses() {
      User.getStatuses(vm.username, User.getID())
        .then(function(statuses) {
          vm.statuses = statuses.statuses;
          var uservotes = {};
          for (i = 0; i < statuses.uservotes.length; i++) {
            uservotes[statuses.uservotes[i].id] = true;
          }
          // transform timestamp to readable format
          for (var i = 0; i < vm.statuses.length; i++) {
            vm.statuses[i].timestamp = moment(vm.statuses[i].timestamp).fromNow();

            if (uservotes[vm.statuses[i].id]) {
              vm.statuses[i].votedFor = true;
            } else {
              vm.statuses[i].votedFor = false;
            }
          }
        });
    }

    function getFolloweesStatuses() {
      User.getFolloweesStatuses(User.getID())
        .then(function (statuses) {
          var uservotes = {};
          for (i = 0; i < statuses.uservotes.length; i++) {
            uservotes[statuses.uservotes[i].id] = true;
          }
          vm.followeesStatuses = statuses.statuses;
          // transform timestamp to readable format
          for (var i = 0; i < vm.followeesStatuses.length; i++) {
            vm.followeesStatuses[i].timestamp = moment(vm.followeesStatuses[i].timestamp).fromNow();
            if (uservotes[vm.followeesStatuses[i].id]) {
              vm.followeesStatuses[i].votedFor = true;
            } else {
              vm.followeesStatuses[i].votedFor = false;
            }
          }
        });
    }

    //Get current profile picture(avatar)
    function getAvatar () {
      User.getAvatar(vm.username)
        .then(function (avatar) {
          vm.avatar = avatar[0].profile_photo;
        });
    }

    //Get users greenhouse photos from the server
    function getPhotos () {
      User.getPhotos(vm.username)
        .then(function (data) {
          vm.photos = [];
          for (var i = 0; i < data.length; i++) {
            vm.photos.push(data[i]);
          }
          vm.currentPhotos = vm.photos.slice(0,2);
        });
    }
  }
})();
