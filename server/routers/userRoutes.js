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

  app.put('/:id', userController.updateProfile);



  // Scoped Key for Tessel Data
  app.get('/scopekey/:username', userController.getScopedKey);

  // User Tags
  app.get('/tags/', userController.getAllTags);

  app.get('/tags/:username', userController.getUserTags);

  app.post('/tags/:id', userController.addUserTag);

  app.delete('/tags/:tagid/:userid', userController.deleteUserTag);

  // Avatars for users
  app.post('/upload/avatar/:id', userController.uploadAvatar);

  app.get('/avatarpath/:username', userController.getAvatarPath);

  app.post('/avatarpath/:id', userController.addAvatarPath);

  // Greenhouse photos
  app.get('/photos/:username', userController.getPhotos);

  // For uploading photos first to S3
  app.post('/photos/aws/:id', userController.addPhotoS3);

  // If photo is stored somewhere else, get path and store in database
  app.post('/photos/path/:id', userController.addPhotoURL)

  app.delete('/photos/:id', userController.deletePhoto);

  
}