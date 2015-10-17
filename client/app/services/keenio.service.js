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
    function query(callback) {
      Keen.ready(
        function(){
          // ----------------------------------------
          //  Temperature Knob 
          // ----------------------------------------

          //create query here
          var temperature = new Keen.Query("average", {
            eventCollection: "climate",
            targetProperty: "temp",
            // timeframe: {
            //   start: "2014-10-06T00:00:00.000",
            //   end: "2014-10-07T00:00:00.000"
            // }
            timeframe: "today"
          });

          //make a knob for the input box
          $("#chart-01").knob({
            'angleArc':250,
            'angleOffset':-125,
            'readOnly':true,
            // 'readOnly':false,
            'min':0,
            'max':120,
            'fgColor': Keen.Dataviz.defaults.colors[1]
            // 'fgColor': rgb(254, 102, 114)
          });

          //execute the query and pass the result to the callback
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
  }
})();
