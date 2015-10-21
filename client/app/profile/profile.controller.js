(function() {
  'use strict';

  angular.module('app')
    .controller('ProfileController', ProfileController);

  function ProfileController(User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.about = 'Talk a little about yourself...';
    vm.location = 'Where are you?';
    vm.photo = '';
    vm.tags = ['Plants?', 'Methods/Technologies?', 'Interests?', 'Put them here.'];
    vm.username = 'Who am I?';

    getProfile();

    function getProfile() {
      User.getProfile()
        .then(function(data) {
          vm.about = data.about || vm.about;
          vm.location = data.location || vm.about;
          vm.tags = data.plants || vm.tags;
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
