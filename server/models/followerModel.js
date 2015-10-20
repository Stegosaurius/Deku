//Require DB connection!
var db = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');

module.exports = {

  getFollowers: function (id, callback) {
    db.query('select u.username from users u inner join followers f on (f.follower_id = u.id) where f.user_id = ?',
      [id],
      function (err, followers) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, followers);
        }
    });
  },

  addFollower: function (userID, targetID, callback) {
    db.query('insert into followers (user_id, follower_id) values (?, ?)', [userID, targetID], function (err, results, fields) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, fields);
      }
    });
  }

}