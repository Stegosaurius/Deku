(function() {
  'use strict';

  angular.module('app')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['$window', '$state', 'jwtHelper', 'User'];

  function EditProfileController($window, $state, jwtHelper, User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.about = '';
    vm.avatar = '';
    vm.followers = [];
    vm.followees = [];
    vm.location = '';
    vm.tags = [];
    vm.username = $window.localStorage.username;
    vm.photoPath = '';
    vm.photos = [];
    
    // vm.followers =['john', 'edgar', 'beasta', 'sam', 'watson', 'fred', 'smithy', 'johnson', 'patty', 'ron artest', 'junior'];
    // vm.following =['john', 'edgar', 'beasta', 'elon musk', 'bubba', 'gump', 'shrimp', 'fred', 'smithy', 'johnson', 'patty', 'ron artest', 'junior'];
    // vm.tags = ['tomatos', 'aquaponics', 'kale', 'spruce', 'beans']

    // vm.photos = ['http://www.mnlga.org/slider/rw4Yqd0POkqMUqg.jpg',
    //              'http://www.mafc.com/blog/wp-content/uploads/2014/07/Garden-Greenhouse-108.jpg',
    //              'http://www.sustainablenantucket.org/wp-content/uploads/2014/03/green_house_77.jpg'];



    //editProfile user actions
    vm.updateProfile = updateProfile;
    vm.addTag = addTag;
    vm.removeTag = removeTag;
    vm.unfollow = unfollow;
    vm.updateAvatar = updateAvatar;
    vm.addPhotoByPath = addPhotoByPath;

    //Invoke get profile to prepopulate our view model with 
    //existing data for a user. This way the data object will
    //be complete when we send it to the database.
    getProfile();
    getTags();
    getFollowers();
    getPhotos();
    //getAvatar();

    // return active user's ID
    function getID() {
      return jwtHelper.decodeToken($window.localStorage.token).id;
    }

    function getProfile () {
      User.getProfile(vm.username)
        .then(function(data) {
          console.log(data);
          vm.about = data.about;
          vm.location = data.location;
          // vm.tags = data.plants || ['kale', 'spinach', 'chia'];
          // getPhoto();
        });
    }

    //Update location and about sections of profile
    function updateProfile () {
      var id = getID();
      User.updateProfile(vm, id)
        .then(function(data) {
          $state.transitionTo('profile', {username : vm.username});
        })
        .catch(function(status) {
          vm.message = 'Bad things';
        });
    }

    function getFollowers() {
      User.getFollowers(vm.username)
        .then(function(data) {
          vm.followers = [];
          for (var i = 0; i < data.length; i++) {
            vm.followers.push(data[i].username);
          }
        });

      User.getFollowees(vm.username)
        .then(function(data) {
          vm.followees = [];
          for (var i = 0; i < data.length; i++) {
            vm.followees.push(data[i].username);
          }
        });
    }

    //Remove someone the user is following.
    function unfollow (followee) {
      User.unfollow(getID(), followee)
        .then(function (data) {
          getFollowers();
        })
    }

    //Get current profile picture(avatar)
    function getAvatar () {
      User.getAvatar(vm.username)
        .then(function (avatar) {
          vm.avatar = avatar;
        });
        //After we get the avatar, we then need to use
        //the url as the src attribute in the image
    }

    //Uploading a new profile picture
    function updateAvatar () {

    }

    //Get all tags for the user and add them to the vm
    function getTags () {
      User.getTags(vm.username)
        .then(function (data) {
          console.log(data);
          vm.tags = data;
        });
    }

    //Add tag to the vm tags list and send the new tag to the 
    //server to store the new tag in the database
    function addTag () {
      var id = getID();
      User.addTag(vm.newTag, id)
        .then(function successCallback(res) {
          getTags();
        });
      vm.newTag='';
    }

    //Remove a tag when user clicks x on a particular tag item
    function removeTag (tag) {
      var user_id = getID();
      User.removeTag(tag.id, user_id);
      getTags();
    }

    //Get users greenhouse photos from the server
    function getPhotos () {
      User.getPhotos(vm.username)
        .then(function (data) {
          vm.photos = [];
          for (var i = 0; i < data.length; i++) {
            vm.photos.push(data[i].photo);
          }
        })
      //get user photos urls from the server
      //load different urls into src attributes
      //for user images.
    }

    function removeUserPhoto () {
      //Delete user photo from the vm photos url list.
      //Send request to server to delete the specified
      //photo url from the database
    }

    function addPhotoByPath () {
      User.addPhotoByPath(getID(), vm.photoPath)
        .then(function (data) {
          //invoke get user photos
        });
      //2 options
      //Add a url to a photo which will get added to the
      //src of an img tag and sent to the db for storage.

      //or upload a photo, store the url in the database, 
      //then fetch that url and ad it to the vm.photos array.
    }


    
  }
})();