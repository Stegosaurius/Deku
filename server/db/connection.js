var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost', // create || condition to set production host
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