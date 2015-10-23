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
    vm.avatar = '';
    vm.followers = [];
    vm.following = [];
    vm.location = '';
    vm.recentThreadNames = [];
    vm.recentThreads = {};
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
          // getRecentThreads();
          // getAvatar();
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

    // store thread names for listing on page
    // make obj so thread id can be referenced from thread name
    function getRecentThreads() {
      User.getRecentThreads(vm.username)
        .then(function(data) {
          for (var i = 0; i < data.length; i++) {
            vm.recentThreadNames.push(data[i].thread);
            vm.recentThreads[data[i].thread] = data[i].id;
          }
        });
    }

    // this may change
    function getAvatar() {
      User.getAvatar(vm.username)
        .then(function(avatar) {
          vm.avatar = avatar;
        });
    }
  }
})();
