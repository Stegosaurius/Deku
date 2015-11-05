(function() {
  'use strict';

  angular.module('app')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$window', '$state', 'jwtHelper', 'User'];

  function AuthController($window, $state, jwtHelper, User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.message = '';
    vm.signin = signin;
    vm.signup = signup;
    vm.user = {};

    function resetForm(message) {
      vm.form.$setPristine();
      vm.user.password = '';
      vm.message = message;
    }

    function saveToken(token) {
      // save JWT and user info to local storage
      $window.localStorage.token = token;
      var tokenPayload = jwtHelper.decodeToken(token);
      $window.localStorage.username = tokenPayload.username;
      // TODO: UNCOMMENT THIS LINE WHEN SCOPED KEYS HAVE BEEN IMPLEMENTED
      // $window.localStorage.scopedKey = tokenPayload.read_scoped_key;
    }

    function signin() {
      User.signin(vm.user)
        .then(function(data) {
          saveToken(data.token);
          angular.element('#signinModal').closeModal();
          $state.transitionTo('profile', { username: $window.localStorage.username });
        })
        .catch(function(status) {
          if (status === 404) {
            resetForm('Username not found');
          } else if (status === 422) {
            resetForm('Incorrect password');
          } else {
            resetForm('Login failed. Please try again.');
          }
        });
    }

    function signup() {
      User.signup(vm.user)
        .then(function(data) {
          saveToken(data.token);
          angular.element('#signupModal').closeModal();
          $state.transitionTo('editProfile');
        })
        .catch(function(status) {
          if (status === 409) {
            resetForm('Username already taken');
          } else {
            resetForm('Sign up failed. Please try again.');
          }
        });
    }
  }
})();
