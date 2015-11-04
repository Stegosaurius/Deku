(function() {
  angular.module('app')
    .factory('Keenio', Keenio);

  Keenio.$inject = ['$stateParams','$http', '$window','User'];

  function Keenio($stateParams,$http, $window, User) {
    var username = $window.localStorage.username; //current user's username
    var viewing = $stateParams.username; //username of dashboard in current view
    console.log('viewing',viewing);
    console.log('current users username',username);
    var userID = User.getID(); //get ID of current user
    var url = '/users/scopedkey/read/' + viewing;
    console.log('url',url);//  /users/scopedkey/beasta

    var services = {
      tempQuery: tempQuery, 
      humidityQuery : humidityQuery,
      lightQuery : lightQuery,
      soundQuery : soundQuery,
      lightTriggerQuery : lightTriggerQuery,
      soundTriggerQuery : soundTriggerQuery,
      tempTimelineQuery : tempTimelineQuery,
      humidityTimelineQuery : humidityTimelineQuery,
      lightTimelineQuery : lightTimelineQuery,
      soundTimelineQuery : soundTimelineQuery,
      keenInitialize:keenInitialize
    };

    return services;

    function keenInitialize(viewing){
      return $http.get('/users/scopedkey/read/' + viewing)
        .then(function (res) {
          return res.data;
        });
    }
    function tempQuery(client,viewing,callback) {
      Keen.ready(
        function(){

          //Temperature Knob Query
          var temperature = new Keen.Query("average", {
            eventCollection: "climate",
            targetProperty: "temp",
            // timeframe: {
            //   start: "2014-10-06T00:00:00.000",
            //   end: "2014-10-07T00:00:00.000"
            // }
            timeframe: "today",
            filters: [{
              "property_name":"username",
              "operator" : "eq",
              "property_value": viewing 
            }]
          });

          $("#chart-01").knob({
            'angleArc':250,
            'angleOffset':-125,
            'readOnly':true,
            // 'readOnly':false,
            'min':0,
            'max':120,
            'fgColor': Keen.Dataviz.defaults.colors[1]
          });

          client.run(temperature, function(err, res){
            if(err){
              callback(err);
            }else{
              callback(null,res.result);
            }
          });

        }
      );
    }
    function humidityQuery(client,viewing,callback) {
      Keen.ready(
        function(){

          //Humidity Knob Query
          var humidity = new Keen.Query("average", {
            eventCollection: "climate",
            targetProperty: "humidity",
            // timeframe: {
            //   start: "2014-10-06T00:00:00.000",
            //   end: "2014-10-07T00:00:00.000"
            // }
            timeframe: "today",
            filters: [{
              "property_name":"username",
              "operator" : "eq",
              "property_value": viewing 
            }]
          });

          $("#chart-02").knob({
            'angleArc':250,
            'angleOffset':-125,
            'readOnly':true,
            'min':0,
            'max':50,
            'fgColor': Keen.Dataviz.defaults.colors[0]
          });
          
          client.run(humidity, function(err, res){
            if(err){
              callback(err);
            }else{
              callback(null,res.result);
            }
          });

        }
      );
    }
    function lightQuery(client,viewing,callback) {
      Keen.ready(
        function(){

          //Light Knob Query
          var light = new Keen.Query("average", {
            eventCollection: "climate",
            targetProperty: "light",
            // timeframe: {
            //   start: "2014-10-06T00:00:00.000",
            //   end: "2014-10-07T00:00:00.000"
            // }
            timeframe: "today",
            filters: [{
              "property_name":"username",
              "operator" : "eq",
              "property_value": viewing 
            }]
          });

          $("#chart-03").knob({
            'angleArc':250,
            'angleOffset':-125,
            'readOnly':true,
            'step':0.01,
            'min':0,
            'max':50,
            'fgColor': Keen.Dataviz.defaults.colors[2]
           });
          
          client.run(light, function(err, res){
            if(err){
              callback(err);
            }else{
              callback(null,res.result);
            }
          });

        }
      );
    }
    function soundQuery(client,viewing,callback) {
      Keen.ready(
        function(){

          //Humidity Knob Query
          var sound = new Keen.Query("average", {
            eventCollection: "climate",
            targetProperty: "sound",
            // timeframe: {
            //   start: "2014-10-06T00:00:00.000",
            //   end: "2014-10-07T00:00:00.000"
            // }
            timeframe: "today",
            filters: [{
              "property_name":"username",
              "operator" : "eq",
              "property_value": viewing 
            }]
          });

          $("#chart-04").knob({
            'angleArc':250,
            'angleOffset':-125,
            'readOnly':true,
            'step':0.01,
            'min':0,
            'max':100,
            'fgColor': Keen.Dataviz.defaults.colors[3]
          });

          client.run(sound, function(err, res){
            if(err){
              callback(err);
            }else{
              callback(null,res.result);
            }
          });

        }
      );
    }
    function lightTriggerQuery(client,viewing,callback) {
      Keen.ready(
        function(){

          //ligth trigger Query
          var light_timeline = new Keen.Query("count_unique", {
            eventCollection: "climate",
            targetProperty: "light-trigger",
            interval:"hourly",
            // timeframe: {
            //   start: "2014-10-06T00:00:00.000",
            //   end: "2014-10-07T00:00:00.000"
            // }
            timeframe: "today",
            filters: [{
              "property_name":"username",
              "operator" : "eq",
              "property_value": viewing 
            }]
          });

          client.draw(light_timeline, document.getElementById("chart-05"), {
            chartType: "linechart",
            title: " ",
            height: 250,
            width: "auto"
          });

        }
      );
    }
    function soundTriggerQuery(client,viewing,callback) {
      Keen.ready(
        function(){

          //ligth trigger Query
          var sound_timeline = new Keen.Query("count_unique", {
            eventCollection: "climate",
            targetProperty: "sound-trigger",
            interval:"hourly",
            // timeframe: {
            //   start: "2014-10-06T00:00:00.000",
            //   end: "2014-10-07T00:00:00.000"
            // }
            timeframe: "today",
            filters: [{
              "property_name":"username",
              "operator" : "eq",
              "property_value": viewing 
            }]
          });

          client.draw(sound_timeline, document.getElementById("chart-06"), {
            chartType: "linechart",
            title: " ",
            height: 250,
            width: "auto"
          });

        }
      );
    }
    function tempTimelineQuery(client,viewing,callback) {
      Keen.ready(
        function(){

          //temperature level timeline Query
          var tempLevel_timeline = new Keen.Query("average", {
            eventCollection: "climate",
            targetProperty: "temp",
            interval:"minutely",
            // timeframe: {
            //   start: "2014-10-06T00:00:00.000",
            //   end: "2014-10-07T00:00:00.000"
            // }
            timeframe: "today",
            filters: [{
              "property_name":"username",
              "operator" : "eq",
              "property_value": viewing 
            }]
          });

          client.draw(tempLevel_timeline, document.getElementById("chart-07"), {
            chartType: "linechart",
            title: " ",
            height: 250,
            width: "auto"
          });

        }
      );
    }
    function humidityTimelineQuery(client,viewing,callback) {
      Keen.ready(
        function(){

          //humidity level timeline Query
          var humidityLevel_timeline = new Keen.Query("average", {
            eventCollection: "climate",
            targetProperty: "humidity",
            interval:"minutely",
            // timeframe: {
            //   start: "2014-10-06T00:00:00.000",
            //   end: "2014-10-07T00:00:00.000"
            // }
            timeframe: "today",
            filters: [{
              "property_name":"username",
              "operator" : "eq",
              "property_value": viewing 
            }]
          });

          client.draw(humidityLevel_timeline, document.getElementById("chart-08"), {
            chartType: "linechart",
            title: " ",
            height: 250,
            width: "auto"
          });

        }
      );
    }
    function soundTimelineQuery(client,viewing,callback) {
      Keen.ready(
        function(){

          //sound level timeline Query
          var soundLevel_timeline = new Keen.Query("average", {
            eventCollection: "climate",
            targetProperty: "sound",
            interval:"minutely",
            // timeframe: {
            //   start: "2014-10-06T00:00:00.000",
            //   end: "2014-10-07T00:00:00.000"
            // }
            timeframe: "today",
            filters: [{
              "property_name":"username",
              "operator" : "eq",
              "property_value": viewing 
            }]
          });

          client.draw(soundLevel_timeline, document.getElementById("chart-09"), {
            chartType: "linechart",
            title: " ",
            height: 250,
            width: "auto"
          });

        }
      );
    }
    function lightTimelineQuery(client,viewing,callback) {
      Keen.ready(
        function(){

          //light level timeline Query
          var lightLevel_timeline = new Keen.Query("average", {
            eventCollection: "climate",
            targetProperty: "light",
            interval:"minutely",
            // timeframe: {
            //   start: "2014-10-06T00:00:00.000",
            //   end: "2014-10-07T00:00:00.000"
            // }
            timeframe: "today",
            filters: [{
              "property_name":"username",
              "operator" : "eq",
              "property_value": viewing 
            }]
          });

          client.draw(lightLevel_timeline, document.getElementById("chart-10"), {
            chartType: "linechart",
            title: " ",
            height: 250,
            width: "auto"
          });

        }
      );
    }
  }
})();
