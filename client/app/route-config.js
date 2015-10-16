(function() {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider, $urlRouterProvider, $httpProvider) {
    // default path
    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/auth/signin.html',
        controller: 'AuthController',
        controllerAs: 'signin'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/auth/signup.html',
        controller: 'AuthController',
        controllerAs: 'signup'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dashboard'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile'
      });
  }
})();
