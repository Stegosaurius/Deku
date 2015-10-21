(function() {
  'use strict';

  angular.module('app')
    .controller('AuthController', AuthController);

  function AuthController($window, $state, jwtHelper, User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.message = '';
    vm.signin = signin;
    vm.signinOAuth = signinOAuth;
    vm.signup = signup;
    vm.signupOAuth = signupOAuth;
    vm.user = {};

    function resetForm(message) {
      vm.form.$setPristine();
      vm.message = message;
    }

    function signin() {
      User.signin(vm.user)
        .then(function(data) {
          // save JWT and user info to local storage
          $window.localStorage.token = data.token;
          var tokenPayload = jwtHelper.decodeToken(data.token);
          $window.localStorage.userID = tokenPayload.id;
          // TODO: UNCOMMENT THIS LINE WHEN SCOPED KEYS HAVE BEEN IMPLEMENTED
          // $window.localStorage.scopedKey = tokenPayload.scoped_key;

          $state.transitionTo('dashboard');
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

    function signinOAuth(url) {
      User.signinOAuth(url)
        .then(function(data) {
          // $window.localStorage.token = data.token;
          // $state.transitionTo('dashboard');
          console.log(data);
        })
        .catch(function() {
          resetForm('Login failed. Please try again.');
        });
    }

    function signup() {
      User.signup(vm.user)
        .then(function(data) {
          // save JWT and user info to local storage
          $window.localStorage.token = data.token;
          var tokenPayload = jwtHelper.decodeToken(data.token);
          $window.localStorage.userID = tokenPayload.id;
          // TODO: UNCOMMENT THIS LINE WHEN SCOPED KEYS HAVE BEEN IMPLEMENTED
          // $window.localStorage.scopedKey = tokenPayload.scoped_key;

          $state.transitionTo('profile');
        })
        .catch(function(status) {
          if (status === 409) {
            resetForm('Username already taken');
          } else {
            resetForm('Sign up failed. Please try again.');
          }
        });
    }

    function signupOAuth(url) {
      User.signupOAuth(url)
        .then(function(data) {
          $window.localStorage.token = data.token;
          $state.transitionTo('profile');
        })
        .catch(function() {
          resetForm('Sign up failed. Please try again.');
        });
    }
  }
})();
