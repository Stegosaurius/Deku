(function() {
  'use strict';

  angular.module('app')
    .controller('ThreadController', ThreadController);

  ThreadController.$inject = ['$state', '$stateParams', 'User', 'Forum'];

  function ThreadController($state, $stateParams, User, Forum) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.messages = [];
    vm.newMessage = '';
    vm.thread = {};
    vm.page = $stateParams.page;
    vm.pageSize = 20;
    vm.total = 100000;

    //user action methods
    vm.changePage = changePage;
    vm.navToUser = navToUser;
    vm.postToThread = postToThread;

    getMessages();

    function changePage(page) {
      $state.transitionTo('thread', { threadID: vm.messages[0].thread_id, page: page });
    }

    function navToUser (username) {
      $state.transitionTo('profile', { username : username });
    }

    function getMessages () {
      Forum.getMessages($stateParams.threadID, $stateParams.page)
        .then(function(data) {
          console.log('the message data is  ', data);
          vm.messages = [];
          for (var i = 0; i < data.messages.length; i++) {
            vm.messages.push(data.messages[i])
            vm.messages[i].timestamp = moment.utc(vm.messages[i].timestamp).fromNow();
          }
          vm.thread = data.thread;
          vm.total = data.count;
        });

    }

    function postToThread () {
      Forum.postToThread(User.getID(), vm.messages[0].thread_id, vm.newMessage)
        .then(function(data) {
          console.log("message posted is ", data);
          getMessages();
        })
    }

  }
})();
