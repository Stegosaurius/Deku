//Require DB connection!
var db = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');


module.exports = {

  getStatuses: function (username, callback) {
      db.query('select s.id, s.user_id, u.username, s.status, s.created_at, s.vote_tally from statuses s \
        inner join users u where u.username = ? and u.id = s.user_id', [username], function (err, statuses) {
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

  getStatusByID: function (id, callback) {
    db.query('select s.id, s.user_id, u.username, s.status, s.created_at, s.vote_tally from statuses s \
      inner join users u where s.id = ?', [id], function (err, status) {
        if (err) {
          callback(err);
        } else {
          callback(null, status);
        }
      });
  },

  addStatus: function (data, callback) {
    var date = Date.now();
    db.query('insert into statuses (user_id, status, created_at) values (?, ?, ?)', [data.userID, data.status, date],
      function (err, res) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
    });
  },

  getFolloweesStatuses: function (id, callback) {
    db.query('select u.username, s.id, s.status, s.created_at, s.vote_tally from users u \
      inner join followers f \
      inner join statuses s where f.follower_id = ? and f.followee_id = s.user_id', [id], function (err, statuses) {
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