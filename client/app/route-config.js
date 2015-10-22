(function() {
  'use strict';

  angular.module('app')
    .config(config)
    .factory('AttachToken', AttachToken)
    .run(run);

  function config($stateProvider, $urlRouterProvider, $httpProvider) {
    // default path
    $urlRouterProvider.otherwise('/dashboard');

    // controllerAs determines how the controller's scope will be identified
    // in our html files
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/auth/signin.html',
        controller: 'AuthController',
        controllerAs: 'signin',
        authenticate: false
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/auth/signup.html',
        controller: 'AuthController',
        controllerAs: 'signup',
        authenticate: false
      })
      .state('dashboard', {
        url: '/dashboard/:username',
        views: {
          'nav': {
            templateUrl: 'app/navbar/navbar.html',
            controller: 'NavbarController',
            controllerAs: 'navbar'
          },
          '': {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dashboard'
          }
        },
        authenticate: true
      })
      .state('profile', {
        url: '/profile/:username',
        views: {
          'nav': {
            templateUrl: 'app/navbar/navbar.html',
            controller: 'NavbarController',
            controllerAs: 'navbar'
          },
          '': {
            templateUrl: 'app/profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'profile'
          }
        },
        authenticate: true
      })
      .state('editProfile', {
        url: '/editProfile',
        views: {
          'nav': {
            templateUrl: 'app/navbar/navbar.html',
            controller: 'NavbarController',
            controllerAs: 'navbar'
          },
          '': {
            templateUrl: 'app/profile/editProfile.html',
            controller: 'EditProfileController',
            controllerAs: 'editProfile'
          }
        },
        authenticate: true
      });

      // auth interceptor to ensure JWT gets sent in request header
      $httpProvider.interceptors.push('AttachToken');
  }

  function AttachToken($window, $q, $injector) {
    return {
      // find user's JWT in local storage and attach it to outgoing request
      request: function(object) {
        object.headers = object.headers || {};

        if ($window.localStorage.token) {
          object.headers.Authorization = 'Bearer ' + $window.localStorage.token;
        }

        return object;
      },
      // reroute user to login in authentication 
      response: function(response) {
        if (response.status === 401) {
          $injector.get('User').signout();
        }

        return response || $q.when(response);
      }
    };
  }

  function run($rootScope, $state, $window) {
    // check for a token in local storage, redirect to sign in if there is none
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (toState.authenticate && !$window.localStorage.token) {
        event.preventDefault();
        $state.transitionTo('signin');
      }
    });
  }
})();
