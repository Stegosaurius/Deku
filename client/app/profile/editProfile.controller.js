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
    vm.location = '';
    vm.photo = '';
    vm.tags = [];
    vm.username = '';
    vm.message = '';

    vm.updateProfile = updateProfile;
    vm.addTag = addTag;

    //Invoke get profile to prepopulate our view model with 
    //existing data for a user. This way the data object will
    //be complete when we send it to the database.
    getProfile();

    function getProfile() {
      User.getProfile($window.localStorage.username)
        .then(function(data) {
          console.log(data);
          vm.about = data.about;
          vm.location = data.location;
          // vm.tags = data.plants;
          //placeholder
          vm.tags = ['kale', 'spinach', 'chia']
          vm.username = data.username;
          // getPhoto();
        });
    }

    //Send new user data to the database to update the user's
    //Profile and redirect them to their profile page.
    function updateProfile() {
      User.updateProfile(vm)
        .then(function(data) {
          $state.transitionTo('profile');
        })
        .catch(function(status) {
          vm.message = 'Bad things';
        });
    }

    //Adds a tag input by the user to the list of tags
    //stored in the view model.
    function addTag() {
      vm.tags.push(vm.newTag);
      console.log(vm.tags);
      vm.newTag='';
    }
    
  }
})();