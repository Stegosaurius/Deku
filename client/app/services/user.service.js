(function() {
  'use strict';

  angular.module('app')
    .factory('User', User);

  User.$inject = ['$http'];

  function User($http) {
    var userID = '';

    var services = {
      signin: signin,
      signup: signup,
      getProfile: getProfile
    };

    return services;

    function signin(data) {
      $http.post('/auth/signin', data)
        .then(function successCallback(res) {
          userID = res.data.id;
        }, function errorCallback(res) {
          console.log('Error signing in');
        });
    }

    function signup(data) {
      $http.post('/auth/signup', data)
        .then(function successCallback(res) {
          userID = res.data.id;
        }, function errorCallback(res) {
          console.log('Error signing in');
        });
    }

    function getProfile() {
      $http.get('/users', {
        params: { id: userID }
      })
      .then(function successCallback(res) {
        return res.data;
      }, function errorCallback(res) {
        console.log('Error retrieving user profile');
      });
    }
  }
})();