var express = require('express');

//Our app is an instance of express
var app = express();

//Configure our port for deployment/local development
var port = process.env.PORT || 3000;
console.log(port);

//Set up MySQL database here
  //Conditional check for connecting to instance of deployed or local DB


//configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);


//Our app will listen to whatever port we are currently using
app.listen(port);


console.log("Listening on port: ", port);

//export our app for testing and flexibility
module.exports = app;