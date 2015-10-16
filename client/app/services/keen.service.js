(function() {
  angular.module('app')
    .factory('Keen', Keen);

  Keen.$inject = ['$http'];

  function Keen($http) {
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
