// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User = require('../models/userModel');

// load the auth variables
var configAuth = require('../config/auth');

// load helpers
var util = require('../helpers/utilities');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.getUserByID(id, function(err, user) {
            done(err, user);
        });
    });



    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({
        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL
    },
    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
            // find the user in the database based on their email
            User.getUserByEmail(profile.emails[0].value, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user.length === 1) {
                    return done(null, user[0]); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = {
                        username: profile.name.givenName + ' ' + profile.name.familyName,
                        fbID: profile.id,
                        fbToken: token,
                        email: profile.emails[0].value
                    };
                    User.addUserBySocial(newUser, function (err, user) {
                        if (err) {
                            return console.error(err);
                        } else {
                            return done(null, user[0]);
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
                if (err)
                    return done(err);

                if (user.length === 1) {
                    // if a user is found, log them in
                    return done(null, user[0]);
                } else {
                    var newUser = {
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        googleID: profile.id,
                        googleToken: token
                    };

                    User.addUserBySocial(newUser, function (err, user) {
                        if (err) {
                            return console.error(err);
                        } else {
                            return done(null, user[0]);
                        }
                    });
                }
            });
        });

    }));


};