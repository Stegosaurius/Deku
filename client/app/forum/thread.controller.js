(function() {
  'use strict';

  angular.module('app')
    .controller('ThreadController', ThreadController);

  ThreadController.$inject = [];

  function ThreadController() {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

  }
})();
