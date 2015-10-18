var userController = require('../controllers/userController.js');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var auth = require('../config/auth');

module.exports = function (app, passport) {
  //app === userRouter injected from middlware.js

  //Specifying which controller function we wish to call
  //based on the request url

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


  app.post('/auth/signup', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local-signup', function(err, user, info){
      if (err) { 
        return next(err); 
      }

      if (user) {
        return res.json({ token: util.generateWebToken(user) });
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  });

  app.post('/auth/signin', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local-signin', function(err, user, info){
      if (err) { 
        return next(err); 
      }

      if (user) {
        return res.json({ token: util.generateWebToken(user) });
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  });

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
  app.get('/auth/facebook/callback', function (req, res, next) {
    passport.authenticate('facebook', function (err, user, info) {
      if (err) { 
        return next(err); 
      }

      if (user) {
        return res.json({ token: util.generateWebToken(user) });
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  });

  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback', function (req, res, next) {
    passport.authenticate('google', function (err, user, info) {
      if (err) { 
        return next(err); 
      }
      if (user) {
        return res.json({ token: util.generateWebToken(user) });
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  });
  
}