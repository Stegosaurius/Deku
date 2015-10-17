(function() {
  'use strict';

  angular.module('app')
    .controller('DashboardController', DashboardController);

  function DashboardController(User,Keenio) {
    var vm = this;

    vm.greeting = "Hi!!!!";

    Keenio.query( function(err,res){
      if(err) {
        console.log('error in keenio.query callback',err);
      } else {
        //res is the result of a keen.io query made in keenio.service
        $("#chart-01").val(res).trigger('change');
      }
    });

  }
})();
