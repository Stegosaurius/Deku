var Status = require('../models/statusModel');

module.exports = {

  getStatuses: function (req, res) {
    Status.getStatuses(req.params.username, function (err, statuses) {
      if (err) {
        console.error(err);
        res.status(500).end();
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
    Status.addStatus(data, function (err, result) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        Status.getStatusByID(result.insertID, function (err, status) {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            res.status(201).json(status);
          }
        });
      }
    });
  },

  getFolloweesStatuses: function (req, res) {
    Status.getFolloweesStatuses(req.params.userID, function (err, statuses) {
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