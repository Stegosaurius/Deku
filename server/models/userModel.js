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
          debugger;
          callback(null, user);
        }
      })
  },

  updateUser: function (data, callback) {
    db.query('update Users set about = ?, email = ?, profile_photo = ?, location = ? where id = ?', 
      [data.about, data.email, data.photo, data.location, data.id],
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

  getProfilePhoto: function (id, callback) {
    db.query('select profile_photo from users where id = ?', [id], function (err, photo) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, photo);
      }
    });
  },

  addProfilePhoto: function (id, photo, callback) {
    db.query('update users set photo = ? where id = ?', [photo, id], function (err, res) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  },

  getNotifications: function (id, callback) {
    db.query('select n.content from notifications n inner join users u on (n.user_id = u.id) where user_id = ?', [id],
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

  getUserTags: function (id, callback) {
      db.query('select t.tag from tags t inner join usertags u on (t.id = u.tag_id) where u.user_id = ?', [id], function (err, tags) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, tags);
        }
      });
  },

  addTag: function (data, callback) {
    db.query('insert into tags (user_id, tag) values (?, ?)', [data.id, data.tag],
      function (err, res) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, res.insertID);
        }

    });
  }

}