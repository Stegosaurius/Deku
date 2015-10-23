(function() {
  'use strict';

  angular.module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$stateParams', 'User'];

  function ProfileController($stateParams, User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.about = '';
    vm.location = '';
    vm.photo = '';
    vm.tags = [];
    vm.username = '';

    getProfile();

    function getProfile() {
      User.getProfile($stateParams.username)
        .then(function(data) {
          vm.about = data.about || 'Talk a little about yourself...';
          vm.location = data.location || 'Where are you?';
          vm.tags = data.plants || ['Plants?', 'Methods/Technologies?', 'Interests?', 'Put them here.'];
          vm.username = data.username;
          // getPhoto();
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
