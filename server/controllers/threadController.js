//This is where we will put our http req handling functions for 
//for 'api/users' calls. Our functions here will make calls to 
//functions inside our model files, which in turn make the desired
//db queries.

var Thread = require('../models/threadModel.js');


module.exports = {
  //Put all http req handling functions here

  //Get all threads
  getThreadsByPage: function (req, res) {
    Thread.getThreadsByPage(req.params.page, function (err, threads) {
      if (err) {
        //do some error handing
        res.status(500).end();
      } else {
        res.status(200).json(threads);
      }
    })
  },

  getMessagesByPage: function (req, res) {
    Thread.getMessagesByPage(req.params.threadID, req.params.page, function (err, messages) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        Thread.getThreadByID(req.params.threadID, function (err, thread) {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            messages.thread = thread[0];
            res.status(200).json(messages);
          }
        })
      }
    });
  },

  // write a new message to a particular thread
  // update lastupdated column of that thread
  addMessageToThread: function (req, res) {
    var data = {
      userID: req.params.userID,
      threadID: req.params.threadID,
      message: req.body.message
    };

    Thread.addMessageToThread(data, function (err, result) {
      if (err) {
        //Error handling
        console.error(err);
        res.status(500).end();
      } else {
        // update time in thread tabl
        var messageID = result.insertId;
        Thread.updateTimeAndMessagesForThread(data.threadID, function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            Thread.getMessageByID(messageID, function(err, message) {
              if (err) {
                console.error(err);
                res.status(500).end();
              } else {
                res.status(201).json(message);
              }
            });
          }
        })
      }
    });
  },

  addThread: function (req, res) {
    Thread.createThread(req.params.userID, req.body.thread, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        Thread.getMessagesByPage(result.insertId, 1, function (err, thread) {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            res.status(201).json(thread);
          }
        });
      }
    })
  },

  deleteThread: function (req, res) {
    Thread.deleteThread(req.params.threadID, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.status(204).end();
      }
    });
  },

  deleteMessage: function (req, res) {
    Thread.deleteMessage(req.params.messageID, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.status(204).end();
      }
    })
  },

  likeThread: function (req, res) {
    Thread.addUserLikeToThread(req.params.userID, req.params.threadID, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        Thread.upvoteThread(req.params.threadID, function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            res.status(201).end();
          }
        });
      }
    });
  },

  unlikeThread: function (req, res) {
    Thread.removeUserLikeFromThread(req.params.userID, req.params.threadID, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        Thread.downvoteThread(req.params.threadID, function (err, result) {
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

  likeMessage: function (req, res) {
    Thread.addUserLikeForMessage(req.params.userID, req.params.messageID, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        Thread.upvoteMessage(req.params.messageID, function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            res.status(201).end();
          }
        });
      }
    });
  },

  unlikeMessage: function (req, res) {
    Thread.removeUserLikeFromMessage(req.params.userID, req.params.messageID, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        Thread.downvoteMessage(req.params.messageID, function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).end();
          } else {
            res.status(201).end();
          }
        });
      }
    });
  },

  getRecentForumActivity: function (req, res) {
    Thread.getRecentForumActivity(req.params.username, function (err, messages) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.status(200).json(messages);
      }
    })
  },

  getRecentFolloweeActivity: function (req, res) {
    Thread.getRecentFolloweeActivity(req.params.userID, function (err, messages) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.status(200).json(messages);
      }
    });
  }


}