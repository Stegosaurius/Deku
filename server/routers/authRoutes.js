var expressJWT = require('express-jwt');
var auth = require('../config/auth');
var authController = require('../controllers/authController');

module.exports = function (app, passport) {

	app.post('/signup', authController.signup);

	app.post('/signin', authController.signin);

	app.get('/scopekey/:id', authController.getScopedKey);

	// route for logging out
	app.get('/logout', function(req, res) {
	  req.logout();
	  res.redirect('/');
	});

	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
  	app.get('/facebook/callback', passport.authenticate('facebook', { 
      successRedirect: "/#/profile",
      failureRedirect: "/#/signin" }));

	// =====================================
	// GOOGLE ROUTES =======================
	// =====================================
	// send to google to do the authentication
	// profile gets us their basic information including their name
	// email gets their emails
	app.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

	// the callback after google has authenticated the user
	app.get('/google/callback', passport.authenticate('google', 
    {
      successRedirect: "/#/profile",
      failureRedirect: "/#/signin" }));
}