//Require DB connection!
var db = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');

module.exports = {

  getFollowers: function (username, callback) {
    db.query('select u.username from users u inner join followers f on (f.follower_id = u.id) where u.username = ?',
      [id],
      function (err, followers) {
        if (err) {
          callback(err);
        } else {
          callback(null, followers);
        }
    });
  },

  addFollower: function (userID, targetID, callback) {
    db.query('insert into followers (user_id, follower_id) values (?, ?)', [userID, targetID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res.insertID);
      }
    });
  },

  deleteFollower: function (userID, followerID, callback) {
    db.query('delete from followers where user_id = ? and where follower_id = ?', [userID, followerID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  }

}