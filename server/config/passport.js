// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User = require('../models/userModel');

// load the auth variables


var configAuth = require('./auth.js');


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
        profileFields   : ['id', 'displayName', 'location', 'email', 'picture.type(large)']
    },
    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
            // find the user in the database based on their email
            User.getUserByEmail(profile.emails[0].value, function(err, user) {
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err) {
                    done(err);
                }

                // if the user is found, generate new token
                // save token in database
                // then return the updated user object
                if (user[0]) {
                    done(null, user[0]);

                } else {
                    // if there is no user found with that facebook id, create them
                    var createNewUser = function () {

                        var username = '' + profile.displayName.replace(/\s/g, '') + Math.floor(Math.random() * 9999);
                        var newUser = {
                            username: username,
                            email: profile.emails[0].value,
                            photo: profile.photos[0].value || '/assets/placeholder_avatar.svg.hi.png',
                            location: profile._json.location.name
                        };

                        User.addUserBySocial(newUser, function (err, result) {
                            if (err) {
                                createNewUser();
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
                    };
                    createNewUser();
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
                        username: '' + profile.displayName.replace(/\s/g, '') + Math.floor(Math.random() * 9999),
                        email: profile.emails[0].value,
                        photo: profile.photos[0].value || '/assets/placeholder_avatar.svg.hi.png',
                        location: profile._json.placesLived[0].value || null
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