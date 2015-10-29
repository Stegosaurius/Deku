(function() {
  'use strict';

  angular.module('app')
    .factory('Forum', Forum);

  User.$inject = ['$http'];

  function Forum($http) {
    var services = {
      getThreads: getThreads
    };

    return services;

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
