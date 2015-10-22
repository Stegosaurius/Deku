(function() {
  'use strict';

  angular.module('app')
    .factory('User', User);

  function User($http, $window, $state) {

    var services = {
      signin: signin,
      signinOAuth: signinOAuth,
      signout: signout,
      signup: signup,
      signupOAuth: signupOAuth,
      getProfile: getProfile,
      updateProfile: updateProfile
    };

    return services;

    function signin(data) {
      return $http.post('/auth/signin', data)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          throw res.status;
        });
    }

    function signout() {
      delete $window.localStorage.token;
      delete $window.localStorage.username;
      $state.transitionTo('signin');
    }

    function signup(data) {
      return $http.post('/auth/signup', data)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          throw res.status;
        });
    }

    // retrieve user profile information
    function getActiveProfile() {
      var url = '/users/' + $window.localStorage.username;
      
      return $http.get(url)
      .then(function successCallback(res) {
        return res.data;
      }, function errorCallback(res) {
        console.log('Error retrieving user profile');
      });
    }

    // update an existing users profile info
    function updateProfile(data) {
      var url = '/users/' + $window.localStorage.username;

      return $http.put(url, data)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error updating user profile');
        });
    }
  }
})();
