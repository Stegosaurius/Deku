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
    vm.message = '';

    vm.updateProfile = updateProfile;
    vm.addTag = addTag;

    //Invoke get profile to prepopulate our view model with 
    //existing data for a user. This way the data object will
    //be complete when we send it to the database.
    getProfile();

    function getProfile() {
      User.getProfile(vm.username)
        .then(function(data) {
          vm.about = data.about;
          vm.location = data.location;
          vm.tags = data.plants || ['kale', 'spinach', 'chia'];
          // getPhoto();
        });
    }

    //Update location and about sections of profile
    function updateProfile() {
      User.updateProfile(vm)
        .then(function(data) {
          $state.transitionTo('profile');
        })
        .catch(function(status) {
          vm.message = 'Bad things';
        });
    }

    function getFollowers() {
      User.getFollowers(vm.username)
        .then(function (data) {
          vm.followers = data.followers;
          vm.following = data.following;
        });
    }

    //Get current profile picture(avatar)
    function getAvatar() {
      User.getAvatar(vm.username)
        .then(function (avatar) {
          vm.avatar = avatar;
        });
        //After we get the avatar, we then need to use
        //the url as the src attribute in the image
    }

    //Uploading a new profile picture
    function updateAvatar() {

    }

    //Add tag to the vm tags list and send the new tag to the 
    //server to store the new tag in the database
    function addTag() {
      vm.tags.push(vm.newTag);
      console.log(vm.tags);
      vm.newTag='';
      //Invoke updateTags function
    }


    
  }
})();