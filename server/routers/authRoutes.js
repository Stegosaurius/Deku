var expressJWT = require('express-jwt');

// var auth = require('../config/auth');
if (process.env.PORT) {
  var auth = require('../config/auth.deploy.js');
} else {
  var auth = require('../config/auth.js');
}

var authController = require('../controllers/authController');
// load helpers
var util = require('../helpers/utilities');

module.exports = function (app, passport) {

	app.post('/signup', authController.signup);

	app.post('/signin', authController.signin);

	// route for logging out
	app.get('/logout', function(req, res) {
	  req.logout();
	  res.redirect('/');
	});

  app.delete('/:userID', authController.deleteAccount);

	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/facebook', passport.authenticate('facebook', { scope : ['email', 'user_location'] }));

	// handle the callback after facebook has authenticated the user
  	app.get('/facebook/callback', function(req, res, next) {
      passport.authenticate('facebook', function(err, user, info) {
        if (err) { 
          return next(err); 
        }
        if (!user) { 
          return res.redirect('/#/'); 
        }
        console.log('user before sending back is ', user);
        var userObject = {
          id: user.id,
          username: user.username,
          email: user.email 
        };
        var newToken = util.generateWebToken(userObject);
        return res.redirect('/#/oauth/' + newToken);

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
          return res.redirect('/'); 
        }
        var userObject = {
          id: user.id,
          username: user.username,
          email: user.email 
        };
        var newToken = util.generateWebToken(userObject);
        return res.redirect('/#/oauth/' + newToken);

      })(req, res, next);
    });
}