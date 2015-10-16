(function() {
  'use strict';

  angular.module('app')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['User'];

  function AuthController(User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.signin = signin;
    vm.signup = signup;
    vm.user = {};

    function signin() {
      User.signin(vm.user);
    }

    function signup() {
      User.signup(vm.user);
    }
  }
})();
