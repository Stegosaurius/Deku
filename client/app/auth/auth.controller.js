(function() {
  'use strict';

  angular.module('app')
    .controller('AuthController', AuthController);

  function AuthController($window, $state, User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.message = '';
    vm.signin = signin;
    vm.signinOAuth = signinOAuth;
    vm.signup = signup;
    vm.signupOAuth = signupOAuth;
    vm.user = {};

    function signin() {
      User.signin(vm.user)
        .then(function(data) {
          $window.localStorage.token = data.token;
          $state.transitionTo('dashboard');
        })
        .catch(function() {
          vm.signinForm.$setPristine();
          vm.message = "Login failed. Please try again.";
        });
    }

    function signinOAuth(url) {
      User.signinOAuth(url)
        .then(function(data) {
          $window.localStorage.token = data.token;
          $state.transitionTo('dashboard');
        })
        .catch(function() {
          vm.signinForm.$setPristine();
          vm.message = "Login failed. Please try again.";
        });
    }

    function signup() {
      User.signup(vm.user)
        .then(function(data) {
          $window.localStorage.token = data.token;
          $state.transitionTo('profile');
        })
        .catch(function() {
          vm.signupForm.$setPristine();
          vm.message = "Sign up failed. Please try again.";
        });
    }

    function signupOAuth(url) {
      User.signupOAuth(url)
        .then(function(data) {
          $window.localStorage.token = data.token;
          $state.transitionTo('profile');
        })
        .catch(function() {
          vm.signupForm.$setPristine();
          vm.message = "Sign up failed. Please try again.";
        });
    }
  }
})();
