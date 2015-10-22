(function() {
  'use strict';

  angular.module('app')
    .controller('OAuth', OAuth);

  function OAuth($state, $stateParams, $window, Auth) {
    Auth.saveToken($stateParams.token);
    $state.transitionTo('profile', { username: $window.localStorage.username });
  }
})();
