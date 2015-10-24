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


  app.get('/:username', userController.getProfile);

  app.put('/:username', userController.updateProfile);



  // Scoped Key for Tessel Data
  app.get('/scopekey/:username', userController.getScopedKey);

  // User Tags
  app.get('/tags/', userController.getAllTags);

  app.get('/tags/:username', userController.getUserTags);

  app.post('/tags/:username', userController.addUserTag);

  app.delete('/tags/:username', userController.deleteUserTag);

  // Avatars for users
  app.post('/upload/avatar/:username', userController.uploadAvatar);

  app.get('/avatarpath/:username', userController.getAvatarPath);

  app.post('/avatarpath/:username', userController.addAvatarPath);

  // Greenhouse photos
  app.get('/users/photos/:username', userController.getPhotos);

  app.post('/users/photos/:username', userController.addPhoto);
  
}