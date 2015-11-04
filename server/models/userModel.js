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
    db.query('select id, username, email from users', function (err, users) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, users);
      }
    });
  },

  getUserByID: function (id, callback) {
    // we don't need a password since a profile is viewable by anyone
    db.query('select id, username, email, read_scoped_key, about, tessel, location from users where id = ?', [id], function (err, userObj) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, userObj);
      }
    });
  },

  getUserByName: function (username, callback) {
    db.query('select id, username, password, email, read_scoped_key, about, tessel, location from users where username = ?', [username], function (err, user) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }
    })
  },

  getUserByEmail: function (email, callback) {
    db.query('select id, username, email, read_scoped_key, about, tessel, location from users where email = ?',
      [email], function (err, user) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, user);
        }
      })
  },

  updateUser: function (data, callback) {
    db.query('update users set about = ?, email = ?, location = ? where id = ?', 
      [data.about, data.email, data.location, data.userID],
      function (err, res) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
    });
  },

  addUserByLocal: function (data, callback) {
    var readScopedKey = Keen.utils.encryptScopedKey(auth.dashboardConfigure.masterKey, {
      "allowed_operations": ["read"]
      // "filters": [{
      //   "property_name": "username",
      //   "operator": "eq",
      //   "property_value": data.username
      // }]
    });

    var writeScopedKey = Keen.utils.encryptScopedKey(auth.dashboardConfigure.masterKey, {
      "allowed_operations": ["write"],
      "filters": [{
        "property_name": "username",
        "operator": "eq",
        "property_value": data.username
      }]
    });
    var password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
  
    db.query('insert into users (username, password, email, read_scoped_key, write_scoped_key) values (?, ?, ?, ?, ?)', [data.username, password, data.email, readScopedKey, writeScopedKey], function (err, res) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  },

  addUserBySocial: function (data, callback) {
    var readScopedKey = Keen.utils.encryptScopedKey(auth.dashboardConfigure.masterKey, {
      "allowed_operations": ["read"]
      // "filters": [{
      //   "property_name": "username",
      //   "operator": "eq",
      //   "property_value": data.username
      // }]
    });

    var writeScopedKey = Keen.utils.encryptScopedKey(auth.dashboardConfigure.masterKey, {
      "allowed_operations": ["write"],
      "filters": [{
        "property_name": "username",
        "operator": "eq",
        "property_value": data.username
      }]
    });
    db.query('insert into users (username, email, read_scoped_key, write_scoped_key) values (?, ?, ?, ?)', [data.username, data.email, readScopedKey, writeScopedKey],
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
    db.query('update users set profile_photo = ? where id = ?', [photo, userID], function (err, res) {
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

  getReadKey: function (username, callback) {
    db.query('select username, read_scoped_key from users where username = ?', [username], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  getWriteKey: function (userID, callback) {
    db.query('select username, write_scoped_key from users where id = ?', [userID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    })
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
    db.query('select t.id, t.tag from tags t inner join usertags u on (t.id = u.tag_id) \
      inner join users v on (v.id = u.user_id) where v.username = ?', [username], function (err, tags) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, tags);
      }
    });
  },

  getUsersForTag: function (tagname, callback) {
    db.query('select u.username, u.profile_photo, u.location from users u \
      inner join usertags ut inner join tags t where t.tag = ? and ut.tag_id = t.id and ut.user_id = u.id', 
      [tagname], function (err, res) {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      });
  },

  addUserTag: function (data, callback) {
    db.query('insert into usertags (user_id, tag_id) values (?, ?)', 
      [data.userID, data.tagID], function (err, res) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
    });
  },

  addTag: function (tag, callback) {
    db.query('insert into tags (tag) values (?) on duplicate key update tag = tag', [tag], function (err, res) {
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
    db.query('delete from usertags where user_id = ? and tag_id = ?', [userID, tagID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  getPhotos: function (username, callback) {
    db.query('select photos.photo, photos.id from photos inner join users on (users.id = photos.user_id) where users.username = ?', [username], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  addPhoto: function (userID, photo, callback) {
    db.query('insert into photos (user_id, photo) values (?,?) on duplicate key update user_id = user_id', [userID, photo], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  deletePhoto: function (photoID, callback) {
    db.query('delete from photos where photos.id = ?', [photoID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  deleteAccount: function (userID, callback) {
    db.query('delete from users where id = ?', [userID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  enableTessel: function (userID, callback) {
    db.query('update users set tessel = 1 where id = ?', [userID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  disableTessel: function (userID, callback) {
    db.query('update users set tessel = 0 where id = ?', [userID], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  }

}