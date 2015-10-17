(function() {
  angular.module('app')
    .factory('Keenio', Keenio);

  function Keenio($http) {
    var client = new Keen( dashboardConfigure ); //loading keys in this file
    var services = {
      query: query // FAKE
    };

    return services;

    // place functions below
    // FAKE
    function query() {

    }
  }
})();
