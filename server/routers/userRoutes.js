var userController = require('./Controllers/userController.js');


module.exports = function (app) {
  //app === userRouter injected from middlware.js

  //Specifying which controller function we wish to call
  //based on the request url
  app.get('/allUsers', function (req, res) {
    userController.getAllUsers(req, res);
  });
  app.get('/allUsers', function (req, res) {
    userController.getAllUsers(req, res);
  });
  
}