var Follower = require('../models/followerModel.js');
var User = require('../models/userModel.js');

module.exports = {

  getFollowers: function (req, res) {
    Follower.getFollowers(req.params.username, function (err, followers) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.json(followers);
      }
    });
  },

  addFollower: function (req, res) {
    var id = req.params.id;
    Follower.addFollower(id, req.params.id, function (err, follower) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.json(follower);
      }
    });
  },

  unfollow: function (req, res) {
    // get user id of follower first
    User.getUserByName(req.body.follower, function (err, follower) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        // then pass both ids into delete function
        Follower.deleteFollower(req.params.id, follower.id, function (err, result) {
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