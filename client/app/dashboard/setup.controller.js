(function() {
  'use strict';

  angular.module('app')
    .controller('SetupController', SetupController);

  SetupController.$inject = ['$state', '$stateParams', '$window', 'User', 'jwtHelper'];

  function SetupController($state, $stateParams, $window, User, jwtHelper) {
    var vm = this;

    vm.scopedKey = '';
    vm.hideKey = true;

    vm.getScopedKey = function () {
      vm.hideKey = !vm.hideKey;
      vm.scopedKey = "" + jwtHelper.decodeToken($window.localStorage.token).scopedKey;
      console.log(jwtHelper.decodeToken($window.localStorage.token).scopedKey);
      // return vm.scopedKey;
    };

  }

})();
