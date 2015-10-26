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

	getThread: function (threadID, page, callback) {
		db.query('select * from messages where thread_id = ?', [threadID], function (err, messages) {
			if (err) {
				callback(err);
			} else {
				// set up pagination for thread by creating object which stores messages by each page number
				// get length of array of messages and store in count property on object
				// iterate over array of messages
				// for every twenty, store into a property that is the page number
				// 
				callback(null, messages);
			}
		});
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