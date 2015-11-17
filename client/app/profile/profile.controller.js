(function() {
  'use strict';

  angular.module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$stateParams', '$window', 'jwtHelper', 'User'];

  function ProfileController($stateParams, $window, jwtHelper, User) {
    var vm = this;

    // view model properties
    vm.about = '';
    vm.activeUser = false;  // is user viewing his/her own profile?
    vm.avatar = '';
    vm.currentPhotos = [];
    vm.followees = [];
    vm.followers = [];
    vm.isFollowing = false;  // is active user following the user of this profile?
    vm.lessPhotos = false;  // determines if left arrow should be shown
    vm.location = '';
    vm.morePhotos = true;  // determines if right arrow should be shown
    vm.photos = [];
    vm.photoIndex = 0;
    vm.recentThreadNames = [];
    vm.recentThreads = {};
    vm.statuses = [];
    vm.tags = [];
    vm.tagModalData = []; // users who share the tag
    vm.username = $stateParams.username;

    // view model methods
    vm.addStatus = addStatus;
    vm.deleteStatus = deleteStatus;
    vm.follow = follow;
    vm.getNextPhoto = getNextPhoto;
    vm.getPrevPhoto = getPrevPhoto;
    vm.getUsersForTag = getUsersForTag;
    vm.likeStatus = likeStatus;
    vm.unfollow = unfollow;

    // actions on controller instantiation
    angular.element('.lean-overlay').remove();
    checkActiveUser();
    getProfile();

    //////////////////////////
    //  VIEW MODEL METHODS  //
    //////////////////////////

    // post status to database and clear form
    function addStatus() {
      var newStatus = vm.status;

      // reset form
      vm.statusUpdate.$setPristine();
      vm.status = '';

      User.addStatus(newStatus, User.getID())
        .then(function(status) {
          vm.statuses.unshift(status);
          vm.statuses[0].created_at = moment(vm.statuses[0].created_at).fromNow();
        });
    }

    // remove status from database
    function deleteStatus(statusID, index) {
      User.deleteStatus(statusID);

      // remove status from display
      vm.statuses.splice(index, 1);
    }

    // make the active user a follower of this profile's user
    function follow() {
      User.follow(User.getID(), vm.username);
      vm.isFollowing = true;
    }

    // shift displayed photos to the left
    function getNextPhoto () {
      vm.photoIndex++;

      if (vm.photoIndex === vm.photos.length - 1) {
        vm.currentPhotos = [vm.photos[vm.photoIndex]];
        vm.morePhotos = false;
      } else {
        vm.currentPhotos = vm.photos.slice(vm.photoIndex, vm.photoIndex + 2);
      }
      vm.lessPhotos = true;
    }

    // shift displayed photos to the right
    function getPrevPhoto () {
      vm.photoIndex--;

      vm.currentPhotos = vm.photos.slice(vm.photoIndex, vm.photoIndex + 2);
      if (vm.photoIndex === 0) {
        vm.lessPhotos = false;
      }
      vm.morePhotos = true;
    }

    // find users who have the same tag on their profile
    function getUsersForTag(tagname) {
      User.getUsersForTag(tagname)
        .then(function (data) {
          vm.tagModalData = data;
        });
    }

    function likeStatus(status, index) {
      User.likeStatus(User.getID(), status.id)
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

    function unfollow() {
      User.unfollow(User.getID(), vm.username);
      vm.isFollowing = false;
    }

    ///////////////////////
    //   LOCAL METHODS   //
    ///////////////////////

    // check if the active user is viewing his/her own profile
    function checkActiveUser() {
      // checking token is more secure than checking localStorage.username
      var user = jwtHelper.decodeToken($window.localStorage.token).username;
      vm.activeUser = user === $stateParams.username;
    }

    function getProfile() {
      User.getProfile(vm.username)
        .then(function(data) {
          vm.about = data.about;
          vm.location = data.location;

          getAvatar();
          getPhotos();
          getTags();
          getStatuses();
          getFolloweesStatuses();
          getFollowers();
          getRecentThreads();
        });
    }

    // retrieve current profile picture (avatar)
    function getAvatar () {
      User.getAvatar(vm.username)
        .then(function (avatar) {
          vm.avatar = avatar[0].profile_photo;
        });
    }

    function getPhotos () {
      User.getPhotos(vm.username)
        .then(function (data) {
          vm.photos = data;

          // remove scroll arrows if they are unnecessary
          if (vm.photos.length < 2) {
            vm.lessPhotos = false;
            vm.morePhotos = false;
          }

          // set photos that will be displayed
          vm.currentPhotos = vm.photos.slice(0,2);
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

    function getStatuses() {
      User.getStatuses(vm.username, User.getID())
        .then(function(statuses) {
          vm.statuses = statuses.statuses;

          // statuses that the active user has upvoted
          var uservotes = {};
          for (i = 0; i < statuses.uservotes.length; i++) {
            uservotes[statuses.uservotes[i].id] = true;
          }

          for (var i = 0; i < vm.statuses.length; i++) {
            // transform creation date to readable format
            vm.statuses[i].created_at = moment(vm.statuses[i].created_at).fromNow();

            // show user what they have already upvoted
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
          // only show up to 10 most recent statuses
          var numStatuses = Math.min(statuses.statuses.length, 10);

          vm.followeesStatuses = statuses.statuses.slice(0, numStatuses);

          // statuses that the active user has upvoted
          var uservotes = {};
          for (i = 0; i < statuses.uservotes.length; i++) {
            uservotes[statuses.uservotes[i].id] = true;
          }

          for (var i = 0; i < numStatuses; i++) {
            // transform creation date to readable format
            vm.followeesStatuses[i].created_at = moment(vm.followeesStatuses[i].created_at).fromNow();

            // show user what they have already upvoted
            if (uservotes[vm.followeesStatuses[i].id]) {
              vm.followeesStatuses[i].votedFor = true;
            } else {
              vm.followeesStatuses[i].votedFor = false;
            }
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
    function getRecentThreads() {
      User.getRecentThreads(vm.username)
        .then(function(threads) {
          vm.recentThreads = threads;

          // transform timestamps to readable format
          for (var i = 0; i < vm.recentThreads.length; i++) {
            vm.recentThreads[i].created_at = moment(vm.recentThreads[i].created_at).fromNow();
          }
        });
    }
  }
})();
