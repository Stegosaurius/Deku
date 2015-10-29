(function() {
  'use strict';

  angular.module('app')
    .factory('Forum', Forum);

  Forum.$inject = ['$http'];

  function Forum($http) {
    var services = {
      createThread: createThread,
      getThreads: getThreads
    };

    return services;

    function createThread(userID, threadName) {
      return $http.post('/threads/' + userID, { thread: threadName })
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error creating thread');
        });
    }

    function getThreads(page) {
      return $http.get('/threads/' + page)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error retrieving threads by page');
        });
    }
  }
})();
