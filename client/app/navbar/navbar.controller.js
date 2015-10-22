(function() {
  'use strict';

  angular.module('app')
    .controller('NavbarController', NavbarController);

  function NavbarController($window, $state, User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.username = $window.localStorage.username;

    vm.getActiveProfile = getActiveProfile;
    vm.notifications = [];
    // show notification nav icon if there are notifications
    // vm.showNotifications = vm.notifications.length;
    vm.signout = signout;

    // on mobile-sized screen, make the nav bar appear on menu icon click
    angular.element('.button-collapse').sideNav({
      edge: 'right',
      closeOnClick: true
    });

    getNotifications();

    function getActiveProfile() {
      $state.transitionTo('profile', { username: $window.localStorage.username });
    }

    function getNotifications() {
      // User.getNotifications();
      // vm.showNotifications = vm.notifications.length;
    }

    function signout() {
      User.signout();
    }
  }
})();
