(function() {
  'use strict';

  angular.module('app')
    .factory('Forum', Forum);

  Forum.$inject = ['$http'];

  function Forum($http) {
    var services = {
      createThread: createThread,
      getMessages: getMessages,
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

    function getMessages(threadID, page) {
      return $http.get('/threads/messages/' + threadID + '/' + page)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error retrieving thread messages');
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

    function postToThread(userID, threadID, message) {
      return $http.post('/threads/' + userID + '/' + threadID, { message: message })
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error posting to thread');
        })
    }
  }
})();
