//Require DB connection!
var db = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');
var Keen = require("keen-js");
// var auth = require("../config/auth");
if (process.env.PORT) {
  var auth = require('../config/auth.deploy.js');
} else {
  var auth = require('../config/auth.js');
}

module.exports = {
  //Example function for querying the db for all users
  //and passing the result to the callback
  getAllUsers: function (callback) {
    db.query('select id, username from Users', function (err, users) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, users);
      }
    });
  },

  getUserByID: function (id, callback) {
    // we don't need a password since a profile is viewable by anyone
    db.query('select id, username, email, scoped_key, about, location from Users where id = ?', [id], function (err, userObj) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, userObj);
      }
    });
  },

  getUserByName: function (username, callback) {
    db.query('select id, username, password, email, scoped_key, about, location from Users where username = ?', [username], function (err, user) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }
    })
  },

  getUserByEmail: function (email, callback) {
    db.query('select id, username, email, scoped_key, about, location from Users where email = ?',
      [email], function (err, user) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, user);
        }
      })
  },

  updateUser: function (data, callback) {
    db.query('update Users set about = ?, email = ?, profile_photo = ?, location = ? where id = ?', 
      [data.about, data.email, data.photo, data.location, data.userID],
      function (err, res) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
    });
  },

  addUserByLocal: function (data, callback) {
    var scopedKey = Keen.utils.encryptScopedKey(auth.dashboardConfigure.masterKey, {
      "allowed_operations": ["read", "write"]
      // "filters": [{
      //   "property_name": "account.id",
      //   "operator": "eq",
      //   "property_value": "123"
      // }]
    });
    var password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
  
    db.query('insert into users (username, password, email, scoped_key) values (?, ?, ?, ?)', [data.username, password, data.email, scopedKey], function (err, res) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  },

  addUserBySocial: function (data, callback) {
    var scopedKey = Keen.utils.encryptScopedKey(auth.dashboardConfigure.masterKey, {
      "allowed_operations": ["read", "write"]
      // "filters": [{
      //   "property_name": "account.id",
      //   "operator": "eq",
      //   "property_value": "123"
      // }]
    });

    db.query('insert into users (username, email, scoped_key) values (?, ?, ?)', [data.username, data.email, scopedKey],
      function (err, res) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
      });
  },

  getProfilePhoto: function (username, callback) {
    db.query('select profile_photo from users where username = ?', [username], function (err, path) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, path);
      }
    });
  },

  addProfilePhoto: function (userID, photo, callback) {
    db.query('update users set photo = ? where id = ?', [photo, userID], function (err, res) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  },

  getNotifications: function (id, callback) {
    db.query('select n.content from notifications n inner join users u on (n.user_id = u.id) where n.user_id = ?', [id],
      function (err, notifications) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, notifications);
        }
    });
  },

  addNotification: function (id, content, callback) {
    db.query('insert into notifications (user_id, content) values (?, ?)', [id, content], function (err, res) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  },

  getPassword: function (id, callback) {
    db.query('select password from users where id = ?', [id], function (err, res) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  },

  getScopedKey: function (id, callback) {
    db.query('select scoped_key from users where id = ?', [id], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  getAllTags: function (callback) {
    db.query('select * from tags', function (err, tags) {
      if (err) {
        callback(err);
      } else {
        callback(null, tags);
      }
    })
  },

  getUserTags: function (username, callback) {
    db.query('select t.tag from tags t inner join usertags u on (t.id = u.tag_id) \
      inner join users v on (v.id = u.user_id) where v.username = ?', [username], function (err, tags) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, tags);
      }
    });
  },

  addUserTag: function (data, callback) {
    db.query('insert into usertags (user_id, tag_id) values (?, ?)', [data.userID, data.tagID],
      function (err, res) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
    });
  },

  addTag: function (tag, callback) {
    db.query('insert into tags (tag) values (?)', [tag], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  getTag: function (tagname, callback) {
    db.query('select * from tags where tag = ?', [tagname], function (err, tag) {
      if (err) {
        callback(err);
      } else {
        callback(null, tag);
      }
    });
  },

  deleteUserTag: function (userID, tagID, callback) {
    db.query('delete from usertags where user_id = ? and where tag_id = ?', [userID, tagID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  getPhotos: function (username, callback) {
    db.query('select photos.photo from photos inner join users on (users.id = photos.user_id) where users.username = ?', [username], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  addPhoto: function (userID, photo, callback) {
    db.query('insert into photos (user_id, photo) values (?,?)', [userID, photo], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  deletePhoto: function (photo, callback) {
    db.query('delete from photos where photo = ?', [photo], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  }

}