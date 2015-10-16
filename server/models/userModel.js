//Require DB connection!
var db = require('../db');
var bcrypt = require('bcrypt-nodejs');

module.exports = {
  //Example function for querying the db for all users
  //and passing the result to the callback
  getAllUsers: function (callback) {
    //Some DB queries here
    db.query('select * from Users', function (err, users) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, users);
      }
    });
  },

  getUser: function (id, callback) {
    // we don't need a password since a profile is viewable by anyone
    db.query('select * from Users where id = ?', [id], function (err, userObj) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, userObj);
      }
    });
  },

  updateUser: function (data, callback) {
    db.query('update Users set about = ?, profile_photo = ?, location = ?, \
      growth_methods = ?, plants = ? where id = ?', 
      [data.about, data.photo, data.location, data.growthMethods, data.plants, data.id],
      function (err, user) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, user);
        }
    });
  },

  addUser: function (data, callback) {
    var password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
    db.query('insert into users values (?, ?)', [data.username, password], function (err, user) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, user);
      }
    });
  }
}