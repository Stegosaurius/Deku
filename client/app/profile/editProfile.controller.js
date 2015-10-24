(function() {
  'use strict';

  angular.module('app')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['$window', '$state', 'User'];

  function EditProfileController($window, $state, User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.about = '';
    vm.avatar = '';
    vm.followers = '';
    vm.following = '';
    vm.location = '';
    vm.tags = [];
    vm.username = $window.localStorage.username;
    // vm.photos = [];

    vm.photos = ['http://www.mnlga.org/slider/rw4Yqd0POkqMUqg.jpg',
                 'http://www.mafc.com/blog/wp-content/uploads/2014/07/Garden-Greenhouse-108.jpg',
                 'http://www.sustainablenantucket.org/wp-content/uploads/2014/03/green_house_77.jpg'];



    //editProfile user actions
    vm.updateProfile = updateProfile;
    vm.addTag = addTag;
    vm.removeTag = removeTag;
    vm.removeFollower = removeFollower;
    vm.updateAvatar = updateAvatar;

    //Invoke get profile to prepopulate our view model with 
    //existing data for a user. This way the data object will
    //be complete when we send it to the database.
    getProfile();
    //getAvatar();

    function getProfile () {
      User.getProfile(vm.username)
        .then(function(data) {
          vm.about = data.about;
          vm.location = data.location;
          // vm.tags = data.plants || ['kale', 'spinach', 'chia'];
          // getPhoto();
        });
    }

    //Update location and about sections of profile
    function updateProfile () {
      User.updateProfile(vm)
        .then(function(data) {
          $state.transitionTo('profile');
        })
        .catch(function(status) {
          vm.message = 'Bad things';
        });
    }

    //Get all of the current user's followers
    function getFollowers () {
      User.getFollowers(vm.username)
        .then(function (data) {
          vm.followers = data.followers;
          vm.following = data.following;
        });
    }

    //Remove a follower when a user clicks the remove
    //button on a specific followers list item
    function removeFollower () {
      //Remove specified follower from the vm.followers
      //list and send to the database to update
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

    }

    //Add tag to the vm tags list and send the new tag to the 
    //server to store the new tag in the database
    function addTag () {
      vm.tags.push(vm.newTag);
      console.log(vm.tags);
      vm.newTag='';
      //Invoke updateTags function
    }

    //Remove a tag when user clicks x on a particular tag item
    function removeTag () {
      //remove a tag from the vm.tags array and send either specified
      //tag or the new tags array to the server to update
    }

    //Get users greenhouse photos from the server
    function getUserPhotos () {
      //get user photos urls from the server
      //load different urls into src attributes
      //for user images.
    }

    function removeUserPhoto () {
      //Delete user photo from the vm photos url list.
      //Send request to server to delete the specified
      //photo url from the database
    }

    function addUserPhoto () {
      //2 options
      //Add a url to a photo which will get added to the
      //src of an img tag and sent to the db for storage.

      //or upload a photo, store the url in the database, 
      //then fetch that url and ad it to the vm.photos array.
    }


    
  }
})();