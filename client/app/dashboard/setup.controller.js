(function() {
  'use strict';

  angular.module('app')
    .controller('SetupController', SetupController);

  SetupController.$inject = ['$state', '$stateParams', '$window', 'User', 'jwtHelper'];

  function SetupController($state, $stateParams, $window, User, jwtHelper) {
    var vm = this;

    vm.scopedKey = '';
    vm.hideKey = true;
    if (!$window.localStorage.tesselStatus) {
      vm.hideEnable = !!jwtHelper.decodeToken($window.localStorage.token).tessel;
    } else {
      vm.hideEnable = $window.localStorage.tesselStatus;
    }
    vm.user = User.getID();

    vm.getScopedKey = function () {
      vm.hideKey = !vm.hideKey;
      vm.scopedKey = "" + jwtHelper.decodeToken($window.localStorage.token).scopedKey;
    };

    vm.enableTessel = function() {
      User.enableTessel(vm.user).then(function (data) {
        vm.hideEnable = !!data.tessel;
        $window.localStorage.tesselStatus = !!data.tessel;
      });
    };

  }

})();
