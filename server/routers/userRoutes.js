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

  app.post('/auth/signup', passport.authenticate('local-signup', {
    successRedirect: '/#/profile',
    failureRedirect: '/#/signup',
    failureFlash: true
  }));

  app.post('/auth/signin', passport.authenticate('local-login', {
    successRedirect: '/#/dashboard',
    failureRedirect: '/#/signin',
    failureFlash: true
  }));

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
    successRedirect : '/#/profile',
    failureRedirect : '/#/signin'
  }));

  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect : '/#/profile',
    failureRedirect : '/#/signin'
  }));
  
}