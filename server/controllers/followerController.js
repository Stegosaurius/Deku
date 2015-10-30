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
        Follower.getFollowers(followee[0].id, function (err, followers) {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
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
        Follower.getFollowees(follower[0].id, function (err, followees) {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
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
        Follow.checkFollowee(req.params.followerID, followee[0].id, function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).end();
          } 
          if (!result[0]) {
            Follower.follow(req.params.followerID, followee[0].id, function (err, result) {
              if (err) {
                console.error(err);
                res.status(500).end();
              } else {
                res.status(201).end();
              }
            });
          } else {
            res.status(204).end();
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