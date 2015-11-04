(function() {
  'use strict';

  angular.module('app')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$stateParams','$window','User', 'Keenio'];

  function DashboardController($stateParams,$window,User,Keenio) {
    var vm = this;
    vm.user = $stateParams.username;
    Keenio.keenInitialize(vm.user)
      .then(function(data){
        dashboardConfigure.readKey = data.read_scoped_key;
        var client = new Keen( dashboardConfigure ); //loading keys in this file
        Keenio.tempQuery(client, vm.user, function(err,res){
          if(err) {
            console.log('error in keenio.tempQuery callback',err);
          } else {
            //res is the result of a keen.io query made in keenio.service
            $("#chart-01").val(res).trigger('change');
          }
        });
        Keenio.humidityQuery(client, vm.user, function(err,res){
          if(err) {
            console.log('error in keenio.humidityQuery callback',err);
          } else {
            $("#chart-02").val(res).trigger('change');
          }
        });
        Keenio.lightQuery(client, vm.user, function(err,res){
          if(err) {
            console.log('error in keenio.lightQuery callback',err);
          } else {
            $("#chart-03").val(res).trigger('change');
          }
        });
        Keenio.tempTimelineQuery(client, vm.user);
        Keenio.humidityTimelineQuery(client, vm.user);
        Keenio.soundTimelineQuery(client, vm.user);
        Keenio.lightTimelineQuery(client, vm.user);
      });
  }
})();
