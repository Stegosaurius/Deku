var Follower = require('../models/followerModel.js');
var User = require('../models/userModel.js');

module.exports = {

  getFollowers: function (req, res) {
    // get followee id first using username
    User.getUserByName(req.params.username, function (err, followee) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        console.log(followee);
        Follower.getFollowers(followee[0].id, function (err, followers) {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
            console.log(followers);
            res.status(200).json(followers);
          }
        });
      }
    });
  },

  getFollowees: function (req, res) {
    // get followee id first using username
    User.getUserByName(req.params.username, function (err, follower) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        console.log(follower);
        Follower.getFollowees(follower[0].id, function (err, followees) {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
            console.log(followees);
            res.status(200).json(followees);
          }
        });
      }
    });
  },

  follow: function (req, res) {
    User.getUserByName(req.params.followeeName, function (err, followee) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        Follower.follow(req.params.followerID, followee[0].id, function (err, follower) {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            res.status(201).json(follower);
          }
        });
      }
    })
  },

  unfollow: function (req, res) {
    // get user id of follower first
    User.getUserByName(req.params.followeeName, function (err, followee) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        // then pass both ids into delete function
        Follower.unfollow(req.params.followerID, followee[0].id, function (err, result) {
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