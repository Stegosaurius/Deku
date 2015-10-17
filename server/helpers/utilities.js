var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var auth = require('../config/auth');

module.exports = {
  isValidPassword: function (candidatePassword, hashedPassword) {
    return bcrypt.compareSync(candidatePassword, hashedPassword);
  },

  generateWebToken: function (userObj) {
    // set expiration to 5 hours
    var profile = {
      id: userObj.id,
      username: userObj.username,
      email: userObj.email
    };

    return jwt.sign(profile, auth.secret, { expiresInMinutes: 60*5 });
  }
}