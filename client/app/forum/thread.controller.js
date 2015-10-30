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

    vm.avatarPath = "http://s3-ak.buzzfeed.com/static/enhanced/terminal01/2011/2/15/13/enhanced-buzz-16839-1297795475-9.jpg";

    vm.postToThread = postToThread;

    getMessages();

    function getMessages () {
      Forum.getMessages($stateParams.threadID, $stateParams.page)
        .then(function(data) {
          vm.messages = [];
          for (var i = 0; i < data.messages.length; i++) {
            vm.messages.push(data.messages[i])
          }
          vm.thread = data.thread;
        });
    }

    //TODO A function that uses the user_ids from the messages to find the 
    //username and avatar path for each message

    function postToThread () {
      Forum.postToThread(User.getID(), vm.thread.id, vm.newMessage)
        .then(function(data) {
          getMessages();
        })
    }
  }
})();
