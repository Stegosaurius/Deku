var userController = require('./controllers/userController.js');


module.exports = function (app) {
  //app === userRouter injected from middlware.js

  //Specifying which controller function we wish to call
  //based on the request url
  app.get('/:id', function (req, res) {
    //Get the id
    var id = req.params.id;
    userController.getProfile(req, res, id);
  });
  app.put('/:id', function (req, res) {
    //Get the id
    var id = req.params.id;
    userController.updateProfile(req, res, id);
  });
  
}