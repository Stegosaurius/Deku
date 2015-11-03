(function() {
  'use strict';

  angular.module('app')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['User', 'Keenio'];

  function DashboardController(User,Keenio) {
    var vm = this;
    Keenio.then(function (Keenio) {
      // console.log("Keenio is :", Keenio);
        Keenio.tempQuery( function(err,res){
          if(err) {
            console.log('error in keenio.tempQuery callback',err);
          } else {
            //res is the result of a keen.io query made in keenio.service
            $("#chart-01").val(res).trigger('change');
          }
        });

        Keenio.humidityQuery( function(err,res){
          if(err) {
            console.log('error in keenio.humidityQuery callback',err);
          } else {
            $("#chart-02").val(res).trigger('change');
          }
        });

        Keenio.lightQuery( function(err,res){
          if(err) {
            console.log('error in keenio.lightQuery callback',err);
          } else {
            $("#chart-03").val(res).trigger('change');
          }
        });

        Keenio.tempTimelineQuery();
        Keenio.humidityTimelineQuery();
        Keenio.soundTimelineQuery();
        Keenio.lightTimelineQuery();
    });
  }
})();
