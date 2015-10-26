//Require DB connection!
var db = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');


module.exports = {

  getStatuses: function (username, callback) {
      db.query('select s.id, s.user_id, u.username, s.status, s.timestamp, s.vote_tally from statuses s inner join users u where u.username = ?', [username], function (err, statuses) {
        if (err) {
          callback(err, null);
        } else {
          statuses = statuses.sort(function (a,b) {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          });
          callback(null, statuses);
        }
      })
    },

  addStatus: function (data, callback) {
    db.query('insert into statuses (user_id, status) values (?, ?)', [data.userID, data.status],
      function (err, res) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
    });
  },

  getFriendsStatuses: function (id, callback) {
    db.query('select u.username, s.id, s.status, s.timestamp, s.vote_tally from users u \
      inner join followers f on (u.id = f.follower_id) \
      inner join statuses s on (f.follower_id = s.user_id) where u.id = ?', [id], function (err, statuses) {
      if (err) {
        callback(err);
      } else {
        callback(null, statuses);
      }
    })
  },

  deleteStatus: function (id, callback) {
    db.query('delete from statuses where id = ?', [id], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    })
  }
  
}