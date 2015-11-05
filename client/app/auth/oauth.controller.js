(function() {
  'use strict';

  angular.module('app')
    .controller('OAuthController', OAuthController);

  OAuthController.$inject = ['$state', '$stateParams', '$window', 'jwtHelper'];

  function OAuthController($state, $stateParams, $window, jwtHelper) {
    $window.localStorage.token = $stateParams.token;
    console.log('token is ', $stateParams.token)
    var tokenPayload = jwtHelper.decodeToken($stateParams.token);
    $window.localStorage.username = tokenPayload.username;
    $state.transitionTo('profile', { username: $window.localStorage.username });
  }
})();
