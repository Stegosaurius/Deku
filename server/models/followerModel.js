//Require DB connection!
var db = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');

module.exports = {

  // those that the user is following
  getFollowees: function (followerID, callback) {
    db.query('select u.username, u.id from users u inner join followers f where f.follower_id = ? and u.id = f.followee_id',
      [followerID],
      function (err, followees) {
        if (err) {
          callback(err);
        } else {
          callback(null, followees);
        }
    });
  },

  // those that are following the user
  getFollowers: function (followeeID, callback) {
    db.query('select u.username, u.id from users u inner join followers f where f.followee_id = ? and u.id = f.follower_id', [followeeID], function (err, followers) {
      if (err) {
        callback(err);
      } else {
        callback(null, followers);
      }
    })
  },

  follow: function (followerID, followeeID, callback) {
    db.query('insert into followers (follower_id, followee_id) values (?, ?)', [followerID, followeeID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  unfollow: function (followerID, followeeID, callback) {
    db.query('delete from followers where follower_id = ? and followee_id = ?', [followerID, followeeID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  }

}