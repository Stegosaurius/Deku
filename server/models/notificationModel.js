var db = require('../db/connection.js');

module.exports = {
  getNotifications: function (userID, callback) {
    db.query('select n.id, n.content, n.originator_name from notifications n \
      inner join users u where n.user_id = ?', [userID],
      function (err, notifications) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, notifications);
        }
    });
  },

  addNotification: function (userID, content, originator, callback) {
    db.query('insert into notifications (user_id, content, originator_name) values (?, ?, ?)', 
      [userID, content, originator], function (err, res) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  },

  addNotificationByName: function (username, content, originator, callback) {
    db.query('insert into notifications (user_id, content, originator_name) select u.id, ?, ? \
      from users u where u.username = ?', [content, originator, username], function (err, res) {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      });
  },

  deleteNotification: function () {
    db.query('delete from notifications where user_id = ?', [userID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  }
}