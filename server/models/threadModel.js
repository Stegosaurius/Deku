//Require DB connection!
var db = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');

module.exports = {

	getAllThreads: function (id, callback) {
		db.query('select * from threads', function (err, threads) {
			if (err) {
				callback(err);
			} else {
				callback(null, threads);
			}
		});
	},

	getThread: function (id, callback) {
		db.query('select * from messages where thread_id = ?', [id], function (err, messages) {
			if (err) {
				callback(err);
			} else {
				callback(null, messages);
			}
		});
	},

	postToThread: function (data, callback) {
		db.query('insert into messages (user_id, message, thread_id) values (?, ?, ?)', [data.userID, data.message, data.threadID],
			function (err, results, fields) {
				if (err) {
					callback(err);
				} else {
					callback(null, fields);
				}
			});
	},

	createThread: function (name, callback) {
		db.query('insert into threads (thread) value (?)', [name], function (err, results, fields) {
			if (err) {
				callback(err);
			} else {
				callback(null, fields);
			}
		});
	}



  
}