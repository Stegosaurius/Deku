var userController = require('../controllers/userController.js');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var auth = require('../config/auth');
var util = require('../helpers/utilities');
var authController = require('../controllers/authController');

module.exports = function (app, passport) {
  //app === userRouter injected from middlware.js

  // protect /api routes with JWT
  app.use('/api', expressJWT({ secret: auth.secret }));

  app.get('/api/users/:id', function (req, res) {
    //Get the id
    var id = req.params.id;
    userController.getProfile(req, res, id);
  });

  app.put('/api/users/:id', function (req, res) {
    //Get the id
    var id = req.params.id;
    userController.updateProfile(req, res, id);
  });


  app.post('/auth/signup', authController.signup);

  app.post('/auth/signin', authController.signin);

  // route for logging out
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { 
      successRedirect: "/#/profile",
      failureRedirect: "/#/signin" }));

  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback', passport.authenticate('google', 
    {
      successRedirect: "/#/profile",
      failureRedirect: "/#/signin" }));
  
}