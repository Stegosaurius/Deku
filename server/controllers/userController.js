//This is where we will put our http req handling functions for 
//for 'api/users' calls. Our functions here will make calls to 
//functions inside our model files, which in turn make the desired
//db queries.

var model = require('../models/userModel');









module.exports = {
  //Put all http req handling functions here
  getAll: function (req, res) {
    model.get(function (err, rows) {
      if (err) {
        //do some error handing
      } else {
        
      }

    })
  }
}