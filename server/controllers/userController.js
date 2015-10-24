//This is where we will put our http req handling functions for 
//for 'api/users' calls. Our functions here will make calls to 
//functions inside our model files, which in turn make the desired
//db queries.

var User = require('../models/userModel');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var zlib = require('zlib');
var config = require('../config/auth.deploy.js');
var AWS = require("aws-sdk");
AWS.config.update({ accessKeyId: config.awsStorage.accessKey, secretAccessKey: config.awsStorage.secretKey });

module.exports = {
  //Put all http req handling functions here
  getProfile: function (req, res) {
    User.getUserByName(req.params.username, function (err, userProfile) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.json(userProfile[0]);
      }

    });
  },

  updateProfile: function (req, res) {
    var data = req.body;
    data.username = req.params.username;
    User.updateUser(data, function (err, result) {
      if (err) {
        //Error handling
        console.error(err);
        res.send(404);
      } else {
        res.status(201).send(result)
      }
    })
  },

  getUser: function (req, res, id) {
    User.getUserByID(id, function (err, user) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).json(user);
      }
    })
  },

  getAvatarPath: function (req, res) {
    User.getProfilePhoto(req.params.username, function (err, path) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).json({ avatarURL: path });
      }
    });
  },

  addAvatarPath: function (req, res) {
    User.addProfilePhoto(req.params.username, req.body.photo, function (err, result) {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(201).json({ avatarURL: req.body.photo });
      }
    })
  },

  uploadAvatar: function (req, res) {
    var file = req.files.file;
    // Load the stream
    var username = req.params.username;
    var body = fs.createReadStream(file).pipe(zlib.createGzip());
    // Upload the stream
    var s3 = new AWS.S3({params: { Bucket: config.awsStorage.bucket }});
    s3.upload({ Body: body }, function(err, data) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        // store path to avatar in our database
        User.addProfilePhoto(username, data.Location, function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
            res.status(201).json({ avatarURL: data.Location });
          }
        });
      }
    });
  },

  getNotifications: function (req, res, id) {
    User.getNotifications(id, function (err, notifications) {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.json(notifications);
      }
    })
  },

  createNotification: function (req, res, id) {
    User.addNotification(id, req.body.content, function (err, result) {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        res.send(result);
      }
    })
  },

  getScopedKey: function (req, res) {
    var id = req.params.id;
    User.getScopedKey(id, function (err, key) {
      if (err) {
        console.error(err);
        return res.status(500).send();
      } else {
        return res.status(200).json(key[0]);
      }
    });
  },

  getUserTags: function (req, res) {
    var username = req.params.username; 
    User.getUserByName(username, function (err, user) {
      if (err) {
        console.error(err);
        res.status(500).send();
      } else {
        User.getUserTags(user.id, function (err, tags) {
          if (err) {
            console.error(err);
            res.status(500).send();
          } else {
            res.status(200).json(tags);
          }
        });
      }
    });
  },

  addUserTag: function (req, res) {
    // add a tag to the tags table first if it not already part of our collection
    // then add to UserTags table
    var userID = req.params.id;
    var tagname = req.body.tag;
    User.getTag(tagname, function (err, tag) {
      if (err) {
        console.error(err);
        return res.status(500).send();
      } 

      if (!tag[0]) {
        User.addTag(tagname, function (err, result) {
          if (err) {
            console.error(err);
            return res.status(500).send();
          } else {
            User.getTag(tagname, function (err, newtag) {
              if (err) {
                console.error(err);
                return res.status(500).send();
              } else {
                var data = {
                  userID: userID,
                  tagID: tag[0].id
                };
                User.addUserTag(data, function (err, result) {
                  if (err) {
                    console.error(err);
                    return res.status(500).send();
                  } else {
                    return res.status(201).json(newtag[0]);
                  }
                });
              }
            })
          }
        });

      } else { // tag does exist in database already
        var data = {
          userID: userID,
          tagID: tag[0].id
        };
        User.addUserTag(data, function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).send();
          } else {
            res.status(201).json(tag[0]);
          }
        })
      }
    });
  },

  getAllTags: function (req, res) {
    User.getAllTags(function (err, tags) {
      if (err) {
        console.error(err);
        res.status(500).send();
      } else {
        res.status(200).json(tags);
      }
    });
  },

  deleteUserTag: function (req, res) {
    User.getTag(req.body.tag, function (err, tag) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        User.deleteUserTag(req.params.id, tag.id, function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            res.status(204).end();
          }
        })
      }
    })
  },

  // getPhotos: function (req, res) {
  //   User.getPhotos()
  // }



}