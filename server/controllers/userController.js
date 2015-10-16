//This is where we will put our http req handling functions for 
//for 'api/users' calls. Our functions here will make calls to 
//functions inside our model files, which in turn make the desired
//db queries.

var model = require('../models/userModel');


module.exports = {
  //Put all http req handling functions here
  getProfile: function (req, res, id) {
    model.getProfile(id, function (err, userProfile) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.json(userProfile);
      }

    });
  },

  updateProfile: function (req, res, id) {
    model.updateProfile(id, function (err, updatedUser) {
      if (err) {
        //Error handling
        console.error(err);
        res.send(404);
      } else {
        res.json(updatedUser)
      }
    })
  }
}