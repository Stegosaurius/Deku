//Require DB connection!
var db = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');

module.exports = {

  getFollowers: function (username, callback) {
    db.query('select u.username, u.id from users u inner join followers f on (f.follower_id = u.id) where u.username = ?',
      [username],
      function (err, followers) {
        if (err) {
          callback(err);
        } else {
          callback(null, followers);
        }
    });
  },

  addFollower: function (userID, followerID, callback) {
    db.query('insert into followers (user_id, follower_id) values (?, ?)', [userID, followerID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  deleteFollower: function (userID, followerID, callback) {
    db.query('delete from followers where user_id = ? and follower_id = ?', [userID, followerID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  }

}