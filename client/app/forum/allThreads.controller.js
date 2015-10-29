(function() {
  'use strict';

  angular.module('app')
    .controller('AllThreadsController', AllThreadsController);

  AllThreadsController.$inject = ['$stateParams', 'Forum'];

  function AllThreadsController($stateParams, Forum) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.pageCount = 0; // number of pages needed to hold all threads
    vm.threads = [];

    var threadsPerPage = 20; // number of threads displayed on each page

    getAllThreads();

    function getThreads() {
      Forum.getThreads($stateParams.page)
        .then(function(data) {
          vm.threads = data.threads;
          vm.pageCount = Math.ceil(data.count / threadsPerPage);
        });
    }
  }
})();
