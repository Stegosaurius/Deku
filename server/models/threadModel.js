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
				var pageOne = {
					count: messages.length, // return the count so we know how many pages there should be
					messages: messages.splice(0, 20) // return first 20 messages for page one
				};
				callback(null, pageOne);
			}
		});
	},

	getThreadByPage: function (threadID, page, callback) {
		db.query('select * from messages where thread_id = ?', [threadID], function (err, messages) {
			if (err) {
				callback(err);
			} else {
				var filteredMessages = {
					count: messages.length,
					messages: messages.splice(page - 1 * 20, 20)
				};
				callback(null, filteredMessages);
			}
		})
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
		db.query('delete from threads where id = ?', [id], function (err, res) {
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