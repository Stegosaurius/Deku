var expressJWT = require('express-jwt');
var auth = require('../config/auth');
var authController = require('../controllers/authController');

module.exports = function (app, passport) {

	app.post('/signup', authController.signup);

	app.post('/signin', authController.signin);

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
  	app.get('/facebook/callback', function(req, res, next) {
      passport.authenticate('facebook', function(err, user, info) {
        if (err) { 
          return next(err); 
        }
        if (!user) { 
          return res.redirect('/#/signin'); 
        }
        
        return res.redirect('/#/profile/' + user.id);

      })(req, res, next);
    });
	// =====================================
	// GOOGLE ROUTES =======================
	// =====================================
	// send to google to do the authentication
	// profile gets us their basic information including their name
	// email gets their emails
	app.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

	// the callback after google has authenticated the user
	app.get('/google/callback', function(req, res, next) {
      passport.authenticate('google', function(err, user, info) {
        if (err) { 
          return next(err); 
        }
        if (!user) { 
          return res.redirect('/#/signin'); 
        }
        
        return res.redirect('/#/profile/' + user.id);

      })(req, res, next);
    });
}