(function() {
  'use strict';

  angular.module('app')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$window', '$state', 'User'];

  function NavbarController($window, $state, User) {
    // capture variable for binding members to controller; vm stands for ViewModel
    // (https://github.com/johnpapa/angular-styleguide#controlleras-with-vm)
    var vm = this;

    vm.deleteNotification = deleteNotification;
    vm.getActiveProfile = getActiveProfile;
    vm.notifications = [];
    vm.signout = signout;
    vm.username = $window.localStorage.username;

    // on mobile-sized screen, make the nav bar appear on menu icon click
    angular.element('.button-collapse').sideNav({
      menuWidth: 200,
      edge: 'right',
      closeOnClick: true
    });

    getNotifications();

    function deleteNotification(notificationID) {
      User.deleteNotification(notificationID);
      for (var i = 0; i < vm.notifications.length; i++) {
        if (vm.notifications[i].id === notificationID) {
          vm.notifications.splice(i, 1);
          break;
        }
      }
    }

    function getActiveProfile() {
      $state.transitionTo('profile', { username: $window.localStorage.username });
    }

    function getNotifications() {
      // User.getNotifications(User.getID())
      //   .then(function(notifications) {
      //     for (var i = 0; i < notifications.length; i++) {
      //       vm.notifications.push(notifications[i]);
      //     }
      //   });

      var notifications = [ { id: 1, originatorName: 'Beasta', content: ' is now following you' },
                            { id: 2, originatorName: 'shadedprofit', content: ' is now following you'}];

      for (var i = 0; i < notifications.length; i++) {
        vm.notifications.push(notifications[i]);
      }
    }

    function signout() {
      User.signout();
    }
  }
})();
