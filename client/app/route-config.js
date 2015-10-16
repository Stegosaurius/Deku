(function() {
  'use strict';

  angular.module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function config($stateProvider, $urlRouterProvider, $httpProvider) {
    // default path
    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/auth/signin.html',
        controller: 'app/auth/signin.controller.js',
        controllerAs: 'signin'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/auth/signup.html',
        controller: 'app/auth/signup.controller.js',
        controllerAs: 'signup'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'app/dashboard/dashboard.controller.js',
        controllerAs: 'dashboard'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'app/profile/profile.controller.js',
        controllerAs: 'profile'
      });
  }
})();
