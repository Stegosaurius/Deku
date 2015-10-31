var userController = require('../controllers/userController.js');
var expressJWT = require('express-jwt');
// Require multiparty for uploading photos
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();


if (process.env.PORT) {
  var auth = require('../config/auth.deploy.js');
} else {
  var auth = require('../config/auth.js');
}
module.exports = function (app, passport) {
  //app === userRouter injected from middlware.js


  app.get('/:username', userController.getProfile);

  app.put('/:userID', userController.updateProfile);



  // Scoped Key for Tessel Data
  app.get('/scopekey/:username', userController.getScopedKey);

  // User Tags
  app.get('/tags/', userController.getAllTags);

  app.get('/tags/:username', userController.getUserTags);

  app.post('/tags/:userID', userController.addUserTag);

  app.delete('/tags/:tagID/:userID', userController.deleteUserTag);

  // Avatars for users
  app.post('/upload/avatar/:userID', multipartyMiddleware, userController.uploadAvatar);

  app.get('/avatarpath/:username', userController.getAvatarPath);

  app.post('/avatarpath/:userID', userController.addAvatarPath);

  // Greenhouse photos
  app.get('/photos/:username', userController.getPhotos);

  // For uploading photos first to S3
  app.post('/photos/aws/:userID', multipartyMiddleware, userController.addPhotoS3);

  // If photo is stored somewhere else, get path and store in database
  app.post('/photos/path/:userID', userController.addPhotoURL)

  app.delete('/photos/:userID/:photoID', userController.deletePhoto);

  
}