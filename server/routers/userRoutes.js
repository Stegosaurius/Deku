var userController = require('../controllers/userController.js');
var expressJWT = require('express-jwt');
// var auth = require('../config/auth');
if (process.env.PORT) {
  var auth = require('../config/auth.deploy.js');
} else {
  var auth = require('../config/auth.js');
}
module.exports = function (app, passport) {
  //app === userRouter injected from middlware.js
  
  // // protect routes with JWT
  // app.use('/:id', expressJWT({ secret: auth.secret }));

  app.get('/:username', function (req, res) {
    //Get the id
    var username = req.params.username;
    userController.getProfile(req, res, username);
  });

  app.put('/:id', function (req, res) {
    //Get the id
    var id = req.params.id;
    userController.updateProfile(req, res, id);
  });

  app.get('/scopekey/:id', userController.getScopedKey);

  app.get('/tags/:id', userController.getTags);

  app.post('/tags/:id', userController.addTag);
  
}