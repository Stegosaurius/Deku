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
      getProfile: getProfile
    };

    return services;

    function signin(data) {
      return $http.post('/users/auth/signin', data)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          throw res.status;
        });
    }

    function signinOAuth(url) {
      return $http.get(url)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error signing in with OAuth');
        });
    }

    function signout() {
      delete $window.localStorage.token;
      $state.transitionTo('signin');
    }

    function signup(data) {
      return $http.post('/users/auth/signup', data)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          throw res.status;
        });
    }

    function signupOAuth(url) {
      return $http.get(url)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error signing up with OAuth');
        });
    }

    // retrieve user profile information
    function getProfile() {
      var url = '/users/' + userID;
      
      return $http.get(url)
      .then(function successCallback(res) {
        return res.data;
      }, function errorCallback(res) {
        console.log('Error retrieving user profile');
      });
    }

    // update an existing users profile info
    function updateProfile(data) {
      var url = '/users' + userID;

      return $http.post(url, data)
        .then(function successCallback(res) {
          return res.data;
        }, function errorCallback(res) {
          console.log('Error updating user profile')
        });
    }
  }
})();
