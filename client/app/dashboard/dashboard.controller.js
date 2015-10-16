(function() {
  'use strict';

  angular.module('app')
    .controller('DashboardController', DashboardController);

  function DashboardController(User) {
    var vm = this;

    vm.greeting = "Hi!!!!";
  }
})();
