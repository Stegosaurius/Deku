//Require DB connection!
var db = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');

module.exports = {

	getThreadsByPage: function (page, callback) {
		db.query('select * from threads', function (err, threads) {
			if (err) {
				callback(err);
			} else {
				// iterate over results, adding a rank property
				for (var i = 0; i < threads.length; i++) {
				// rank will be determined by a mix of votes, number of comments, and age of thread
				// the longer the thread has been inactive, the lower it's resulting rank, and vice versa
					// convert date time object from sql into javascript date time object
					var t = threads[i].last_updated.split(/[- :]/);
					var lastUpdated = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
					var ageInDays = ( lastUpdated.getTime() - new Date(1970,1,1).getTime() ) / (60 * 60 * 24);
					threads[i].rank = (threads[i].vote_tally + threads[i].messages_count) * (1 / ageInDays)
				}
				// Sort the now ranked threads by their rank (b - a)
				threads.sort(function (a, b) {
					return b.rank - a.rank;
				});
				// Store these sorted threads by groups of 20 in an object
				var filteredThreads = {
					count: threads.length,
					threads: threads.splice((page - 1) * 20, 20);
				}
				// return 
				callback(null, filteredThreads);
			}
		});
	},

	getMessagesByPage: function (threadID, page, callback) {
		db.query('select * from messages where thread_id = ?', [threadID], function (err, messages) {
			if (err) {
				callback(err);
			} else {
				var filteredMessages = {
					count: messages.length,
					messages: messages.splice((page - 1) * 20, 20)
				};
				callback(null, filteredMessages);
			}
		})
	},

	addMessageToThread: function (data, callback) {
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
		db.query('delete from threads where id = ?', [threadID], function (err, res) {
			if (err) {
				callback(err);
			} else {
				callback(null, res);
			}
		});
	},

	deleteMessage: function (messageID, callback) {
		db.query('delete from messages where id = ?', [messageID], function (err, res) {
			if (err) {
				callback(err);
			} else {
				callback(null, res);
			}
		})
	},

	updateTime: function (threadID, callback) {
		db.query('update Threads set last_updated = current_timestamp where id = ?', [threadID], function (err, res) {
			if (err) {
				callback(err);
			} else {
				callback(null, res);
			}
		})
	}
  
}