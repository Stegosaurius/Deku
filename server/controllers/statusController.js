var Status = require('../models/statusModel');

module.exports = {

  getStatuses: function (req, res) {
    Status.getStatuses(req.params.username, function (err, statuses) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        var results = {
          statuses: statuses
        };

        Status.getUserStatusVotes(req.params.currentuserID, function (err, votes) {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            results.uservotes = votes;
            res.status(200).json(results);
          }
        })
      }
    })
  },

  updateStatus: function (req, res) {
    var data = {
      userID: req.params.userID,
      status: req.body.status
    };
    Status.addStatus(data, function (err, result) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        Status.getStatusByID(result.insertId, function (err, status) {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            res.status(201).json(status[0]);
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
    var statusID = req.params.statusID;
    Status.deleteStatus(statusID, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send();
      } else {
        res.status(204).end();
      }
    })
  },

  likeStatus: function (req, res) {
    Status.addUserLikeForStatus(req.params.userID, req.params.statusID, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        // there's no error from server and the user hasn't already liked that status
        Status.upvote(req.params.statusID, function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            res.status(201).end();
          }
        });
      }
    })
  },

  unlikeStatus: function (req, res) {
    Status.removeUserLikeForStatus(req.params.userID, req.params.statusID, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        Status.downvote(req.params.statusID, function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            res.status(204).end();
          }
        })
      }
    })
  }

}