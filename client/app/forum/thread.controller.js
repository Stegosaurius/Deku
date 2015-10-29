(function() {
  'use strict';

  angular.module('app')
    .controller('ThreadController', ThreadController);

  ThreadController.$inject = ['$state', '$stateParams', 'Forum'];

  function ThreadController($state, $stateParams, Forum) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.messages = [];
    vm.thread = {};

    getMessages();

    function getMessages() {
      Forum.getMessages($stateParams.threadID, $stateParams.page)
        .then(function(data) {
          vm.thread = data.thread;
          vm.messages = data.messages;
        });
    }
  }
})();
