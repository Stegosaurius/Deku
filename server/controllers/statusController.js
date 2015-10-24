var Status = require('../models/statusModel');

module.exports = {

  getStatuses: function (req, res) {
    var id = req.params.id;
    Status.getStatuses(id, function (err, statuses) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).json(statuses);
      }
    })
  },

  updateStatus: function (req, res) {
    var data = {
      userID: req.params.id,
      status: req.body.status
    };
    Status.addStatus(data, function (err, status) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(201).json(status);
      }
    })
  },

  getFriendsStatuses: function (req, res) {
    var id = req.params.id;
    Status.getFriendsStatuses(id, function (err, statuses) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).json(statuses);
      }
    });
  },

  deleteStatus: function (req, res) {
    var id = req.params.id;
    Status.deleteStatus(id, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send();
      } else {
        res.status(204).end();
      }
    })
  }

}