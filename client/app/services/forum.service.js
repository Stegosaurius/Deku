(function() {
  'use strict';

  angular.module('app')
    .factory('Forum', Forum);

  Forum.$inject = ['$http'];

  function Forum($http) {
    var services = {
      createThread: createThread,
      getMessages: getMessages,
      getThreads: getThreads,
      likeMessage: likeMessage,
      upvoteThread: upvoteThread,
      postToThread: postToThread
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

    function getMessages(userID, threadID, page) {
      return $http.get('/threads/messages/' + userID + '/' + threadID + '/' + page)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error retrieving thread messages');
        });
    }

    function getThreads(userID, page) {
      return $http.get('/threads/' + userID + '/' + page)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error retrieving threads by page');
        });
    }

    function likeMessage(userID, messageID) {
      return $http.post('/threads/vote/message/' + userID + '/' + messageID)
        .then(function successCallback(res) {
          return res.status;
        }, function errorCallback(res) {
          console.log('Error liking message');
        });
    }

    function upvoteThread(userID, threadID) {
      return $http.post('/threads/vote/' + userID + '/' + threadID)
        .then(function successCallback(res) {
          return res;
        }, function errorCallback(res) {
          console.log('Error liking thread');
          return res;
        });
    }

    function postToThread(userID, threadID, message) {
      return $http.post('/threads/' + userID + '/' + threadID, { message: message })
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error posting to thread');
        });
    }
  }
})();
