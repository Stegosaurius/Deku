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
    vm.plants = [];
    vm.message = '';

    vm.updateProfile = updateProfile;

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