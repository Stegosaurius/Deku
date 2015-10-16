var userController = require('../controllers/userController.js');


module.exports = function (app, passport) {
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

  app.get('/profile', function (req, res) {
    userController.getUserProfile(req, res);
  });

  app.post('/signup', function (req, res) {
    userController.addUser(req, res);
  })
  
}