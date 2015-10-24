//Require DB connection!
var db = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');


module.exports = {

  getStatuses: function (id, callback) {
      db.query('select * from statuses where user_id = ?', [id], function (err, statuses) {
        if (err) {
          callback(err, null);
        } else {
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
          callback(null, res.insertID);
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