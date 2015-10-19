var Follower = require('../models/followerModel.js');

module.exports = {

  getFollowers: function (req, res) {
    var id = req.params.id;
    Follower.getFollowers(id, function (err, followers) {
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
  }

}