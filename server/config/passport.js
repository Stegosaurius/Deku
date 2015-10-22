// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User = require('../models/userModel');

// load the auth variables
var configAuth = require('../config/auth.js');

// load helpers
var util = require('../helpers/utilities');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({
        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields   : ['id', 'displayName', 'email', 'photos']
    },
    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        console.log("Profile is: ", profile);
        console.log("Token is: ", token);
        // asynchronous
        process.nextTick(function() {
            // find the user in the database based on their email
            User.getUserByName(profile.emails[0].value, function(err, user) {
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err) {
                    return done(err);
                }

                // if the user is found, generate new token
                // save token in database
                // then return the updated user object
                if (user.length >= 1) {
                    return done(user[0]);

                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = {
                        username: profile.name.givenName + ' ' + profile.name.familyName,
                        email: profile.emails[0].value,
                        photo: profile.photos[0].value
                    };

                    User.addUserBySocial(newUser, function (err, result) {
                        if (err) {
                            done(err);
                        } else {
                            User.getUserByEmail(newUser.email, function (err, user) {
                                if (err) {
                                    done(err);
                                } else {
                                    done(null, user[0]);
                                }
                            });
                        }
                    });
                }

            });
        });

    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.getUserByEmail(profile.emails[0].value, function(err, user) {

                if (err) {
                    return done(err);
                }

                // if the user is found, generate new token
                // save token in database
                // then return the updated user object
                if (user.length >= 1) {
                    return done(null, user[0]);

                } else {
                    var newUser = {
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        photo: profile.photos[0].value
                    };

                    User.addUserBySocial(newUser, function (err, result) {
                        if (err) {
                            console.error(err);
                            return done(err);
                        } else {
                            User.getUserByEmail(newUser.email, function (err, user) {
                                if (err) {
                                    return done(err);
                                } else {
                                    debugger;
                                    return done(null, user[0]);
                                }
                            });
                        }
                    });
                }
            });
        });

    }));


};