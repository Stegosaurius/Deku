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

	getThread: function (threadID, callback) {
		db.query('select * from messages where thread_id = ?', [threadID], function (err, messages) {
			if (err) {
				callback(err);
			} else {

				callback(null, messages);
			}
		});
	},

	getThreadByPage: function (threadID, page, callback) {

	},

	postToThread: function (data, callback) {
		db.query('insert into messages (user_id, message, thread_id) values (?, ?, ?)', [data.userID, data.message, data.threadID],
			function (err, res) {
				if (err) {
					callback(err);
				} else {
					callback(null, res);
				}
			});
	},

	createThread: function (name, callback) {
		db.query('insert into threads (thread) value (?)', [name], function (err, res) {
			if (err) {
				callback(err);
			} else {
				callback(null, res);
			}
		});
	},

	deleteThread: function (threadID, callback) {

	},

	updateTime: function (threadID, callback) {
		db.query('update Threads set lastupdated = current_timestamp where id = ?', [threadID], function (err, res) {
			if (err) {
				callback(err);
			} else {
				callback(null, res);
			}
		})
	}
  
}