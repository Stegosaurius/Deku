(function() {
  'use strict';

  angular.module('app')
    .controller('ProfileController', ProfileController);

  function ProfileController(User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.about = 'About me...';
    vm.location = 'Where am I?';
    vm.photo = '';
    vm.plants = ['Plants?', 'Methods/Technologies?', 'Interests?', 'Put them here.'];
    vm.username = 'Who am I?';

    getProfile();

    function getProfile() {
      User.getProfile()
        .then(function(data) {
          vm.about = data.about;
          vm.location = data.location;
          vm.tags = data.plants;
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
