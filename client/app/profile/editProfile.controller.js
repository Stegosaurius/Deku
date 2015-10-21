(function() {
  'use strict';

  angular.module('app')
    .controller('EditProfileController', EditProfileController);

  function EditProfileController($state, User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.about = '';
    vm.location = '';
    vm.photo = '';
    vm.plants = [];
    vm.username = '';
    vm.message = '';

    vm.updateProfile = updateProfile;

    //Invoke get profile to prepopulate our view model with 
    //existing data for a user. This way the data object will
    //be complete when we send it to the database.
    getProfile();

    function getProfile() {
      User.getProfile()
        .then(function(data) {
          console.log(data);
          vm.about = data.about;
          vm.location = data.location;
          vm.plants = data.plants;
          vm.username = data.username;
          // getPhoto();
        });
    }

    function updateProfile() {
      User.updateProfile(vm)
        .then(function(data) {
          $state.transitionTo('profile');
        })
        .catch(function(status) {
          vm.message = 'Bad things';
        });
    }
    
  }
})();