//Using mysql and request we will make real API calls.

//These will be end to end tests with reagrd to our server, but
//they will not involve the client.

//The requests will trickle through our entire server, meaning
//it will first hit server.js (which has been injected with middleware.js
//and our different routers), then move on to the controller, which will
//invoke a function from one of our models that makes a DB query, then
//ultimately sends the result(or error) back to the controller, which 
//sends out the http response. 

//Server --> controller --> model -->  DB 
//                                     |
//                                     |
//           controller <-- model  <---

var mysql = require('mysql');
var request = require('request');
var expect = require('chai').expect;

xdescribe('Persistent Express Server with functional Database', function () {
  var dbURL = process.env.DATABASE_URL;

   

  beforeEach(function(done) {
    //Create a connection with the database and open it
    if (dbURL) {
      var dbConnection = mysql.createConnection(dbURL);
  } else {
      var dbConnection = mysql.createConnection({
        host: 'localhost', 
        user: 'root',
        database: 'Deku'
      });
  }
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting to database',err);
      } else {
        console.log('Database is connected');
      }
    });
    //Invoke done so mocha knows it can proceed to the test
    done();
  })

  afterEach(function() {
    //close the connection after each test
    dbConnection.end();
  });

  describe('User authentication requirements', function () {

    it('Should sign up new users using local authentication', function (done) {
      //Make a request
    });

    it('Should sign up new users using FB authentication', function (done) {
      //Make a request
    });

    it('Should sign up new users using Google authentication', function (done) {
      //Make a request
    });

    it('Should reject an attempt to sign up using local authentication with a pre-existing username', function (done) {
      //Make a request
    });

    //Test all possible methods of signin
    it('Should sign in existing users with local authentication', function (done) {
      //Make a request
    });

    it('Should sign in existing using FB authentication', function (done) {
      //Make a request
    });

    it('Should sign in existing using Google authentication', function (done) {
      //Make a request
    });

    it('Should reject signin when a user inputs an invalid username or password ', function (done) {
      //Make a request
    });
    
  });

  
  describe('Client-Thread interaction requirements', function () {

    it('Should create a new thread', function (done) {
      //Make a request
    });

    it('Should post a message to an existing thread', function (done) {
      //Make a request
    });

    it('Should fetch all messages from a specific thread', function (done) {
      //Make a request
    });

    it('Should fetch the titles of all existing threads',   (done) {
      //Make a request
    });

  });

  describe('Follower requirements', function () {

    it('Should fetch all followers for a specific user', function (done) {

    });

    it('Should allow a user to follow another user', function (done) {

    })

  });


  //TODO: 
    //Statuses
    //Message votes
    //Status votes
    //Notifications

  






});
