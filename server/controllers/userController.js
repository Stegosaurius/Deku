//This is where we will put our http req handling functions for 
//for 'api/users' calls. Our functions here will make calls to 
//functions inside our model files, which in turn make the desired
//db queries.

var model = require('../models/userModel');
var bcrypt = require('bcrypt-nodejs');


module.exports = {
  //Put all http req handling functions here
  getProfile: function (req, res, id) {
    model.getProfile(id, function (err, userProfile) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.json(userProfile);
      }

    });
  },

  updateProfile: function (req, res, id) {
    model.updateProfile(id, function (err, updatedUser) {
      if (err) {
        //Error handling
        console.error(err);
        res.send(404);
      } else {
        res.json(updatedUser)
      }
    })
  },

  // createUser: function (req, res, id) {
  //   model.addUser(req.body, function (err, user) {
  //     if (err) {
  //       console.error(err);
  //       res.status(404).send(err);
  //     } else {
  //       res.json(user);
  //     }
  //   });
  // },

  getUser: function (req, res, id) {
    model.getUserByID(id, function (err, user) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.json(user);
      }
    })
  },

  getProfilePhoto: function (req, res, id) {
    model.getProfilePhoto(id, function (err, photo) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.send(photo);
      }
    });
  },

  addProfilePhoto: function (req, res, id) {
    model.addProfilePhoto(id, req.body.photo, function (err, photo) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.send(photo);
      }
    })
  },

  getFollowers: function (req, res, id) {
    model.getFollowers(id, function (err, followers) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.json(followers);
      }
    });
  },

  addFollower: function (req, res, id) {
    model.addFollower(id, req.params.id, function (err, follower) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.json(follower);
      }
    });
  },

  getStatuses: function (req, res, id) {
    model.getStatuses(id, function (err, statuses) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.json(statuses);
      }
    })
  },

  updateStatus: function (req, res, id) {
    model.addStatus(req.body, function (err, status) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.json(status);
      }
    })
  },

  getNotifications: function (req, res, id) {
    model.getNotifications(id, function (err, notifications) {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.json(notifications);
      }
    })
  },

  createNotification: function (req, res, id) {
    model.addNotification(id, req.body.content, function (err, notification) {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.json(notification);
      }
    })
  }
}