(function() {
  'use strict';

  angular.module('app')
    .controller('SetupController', SetupController);

  SetupController.$inject = ['$state', '$stateParams', 'User', 'jwtHelper'];

  function SetupController($state, $stateParams, User, jwtHelper) {
    var vm = this;

    vm.scopedKey = '';

    vm.getScopedKey = function () {
      vm.scopedKey = jwtHelper.decodeToken($window.localStorage.token).write_scoped_key;
    };

  }

})();
