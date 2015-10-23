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
    vm.followers = [];
    vm.following = [];
    vm.location = '';
    vm.photo = '';
    vm.statuses = [];
    vm.tags = [];
    vm.username = $stateParams.username;

    getProfile();

    function getProfile() {
      User.getProfile(vm.username)
        .then(function(data) {
          vm.about = data.about || 'Talk a little about yourself...';
          vm.location = data.location || 'Where are you?';
          vm.tags = data.plants || ['Plants?', 'Methods/Technologies?', 'Interests?', 'Put them here.'];
          // getStatuses();
          // getFollowers();
          // getPhoto();
        });
    }

    function getStatuses() {
      User.getStatuses(vm.username)
        .then(function(statuses) {
          vm.statuses = statuses;
        });
    }

    function getFollowers() {
      User.getFollowers(vm.username)
        .then(function(data) {
          vm.followers = data.followers;
          vm.following = data.following;
        });
    }

    // this may change
    function getPhoto() {
      User.getPhoto(vm.username)
        .then(function(photo) {
          vm.photo = photo;
        });
    }
  }
})();
