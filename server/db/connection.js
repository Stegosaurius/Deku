var mysql = require('mysql');

// var dbURL = process.env.DATABASE_URL || 'localhost';

// var connection = mysql.createConnection({
//   host: dbURL,
//   user: 'root',
//   database: 'deku'
// });


var dbURL = process.env.DATABASE_URL;

if (dbURL) {
  var connection = mysql.createConnection(dbURL);
} else {
  var connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    database: 'deku'
  });
}



connection.connect(function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Database is connected');
  }
});

module.exports = connection;