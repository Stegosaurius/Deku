(function() {
  'use strict';

  angular.module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['User'];

  function ProfileController(User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.about = '';
    vm.location = '';
    vm.photo = '';
    vm.plants = [];
    vm.username = '';

    getProfile();

    function getProfile() {
      User.getProfile()
        .then(function(data) {
          vm.about = data.about;
          vm.location = data.location;
          vm.plants = data.plants;
          vm.username = data.username;
          getPhoto();
        });
    }

    // this may change
    function getPhoto() {
      User.getPhoto()
        .then(function(photo) {
          vm.photo = photo;
        });
    }
  }
})();
