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

  app.get('/:username', function (req, res) {
    var username = req.params.username;
    userController.getProfile(req, res, username);
  });

  app.put('/:username', function (req, res) {
    var username = req.params.username;
    userController.updateProfile(req, res, username);
  });

  app.get('/scopekey/:id', userController.getScopedKey);

  app.get('/tags/:id', userController.getTags);

  app.post('/tags/:id', userController.addTag);

  app.post('/upload/avatar/:username', userController.uploadAvatar);

  app.get('/avatarpath/:username', userController.getAvatarPath);

  app.post('/avatarpath/:username', userController.addAvatarPath);
  
}