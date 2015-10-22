var mysql = require('mysql');

var dbURL = process.env.DATABASE_URL || 'localhost';

var connection = mysql.createConnection({
  host: dbURL, // create || condition to set production host
  user: 'root',
  database: 'Deku'
});

connection.connect(function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Database is connected');
  }
});

module.exports = connection;