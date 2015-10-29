(function() {
  'use strict';

  angular.module('app')
    .controller('AllThreadsController', AllThreadsController);

  AllThreadsController.$inject = ['$state', '$stateParams', 'User', 'Forum'];

  function AllThreadsController($state, $stateParams, User, Forum) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.createThread = createThread;
    vm.newThread = '';
    vm.pageCount = 0; // number of pages needed to hold all threads
    vm.threads = [];

    var threadsPerPage = 20; // number of threads displayed on each page

    getAllThreads();

    function createThread() {
      Forum.createThread(vm.newThread)
        .then(function(thread) {
          $state.transitionTo('thread', { threadID: thread.id, page: 1 });
        });
    }

    function getThreads() {
      Forum.getThreads(User.getID(), $stateParams.page)
        .then(function(data) {
          vm.threads = data.threads;
          vm.pageCount = Math.ceil(data.count / threadsPerPage);
        });
    }
  }
})();
