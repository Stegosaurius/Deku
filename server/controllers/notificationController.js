var Notification = require('../models/notificationModel.js');

module.exports = {
  getNotifications: function (req, res) {
    Notification.getNotifications(req.params.userID, function (err, notifications) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.status(200).json(notifications);
      }
    })
  },

  addNotification: function (req, res) {
    Notification.addNotification(req.params.username, req.body.content, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.status(201).end();
      }
    })
  },
  
  deleteAllNotifications: function (req, res) {
    Notification.deleteAllNotifications(req.params.userID, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.status(204).end();
      }
    })
  },

  deleteNotification: function (req, res) {
    Notification.deleteNotification(req.params.notificationID, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.status(204).end();
      }
    });
  }
}
