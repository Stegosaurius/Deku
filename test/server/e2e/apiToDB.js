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

describe('Persistent Express Server with functional Database', function () {
  var dbURL = process.env.DATABASE_URL;
  var dbConnection;
  //Create a connection with the database and open it
  beforeEach(function(done) {
    if (dbURL) {
      dbConnection = mysql.createConnection(dbURL);
    } else {
      dbConnection = mysql.createConnection({
        host: 'localhost', 
        user: 'root',
        database: 'Deku'
      });
    }
    dbConnection.connect(function(err) {
      if (err) {
        console.log('error connecting to database',err);
      } else {
        // console.log('Database is connected');
      }
    });
    //Invoke done so mocha knows it can proceed to the test
    done();
  });
  //close the connection after each test
  afterEach(function() {
    dbConnection.end();
  });

  describe('User authentication requirements - Signup', function () {
    beforeEach(function(done){
      done();
    });
    afterEach(function(done){
      done();
    });
    it('Should sign up new users using local authentication', function (done) {
      var password = "Smith";
      var username = "John1234";

      request({ method:'POST',
                uri:'http://localhost:3000/auth/signup',
                json: {
                  "username":username,
                  "password":password
                }
      }, function(req,res){
        console.log('here');
        expect( res.statusCode ).to.equal(201);

        //add
        dbConnection.query('select id, username, password, email, scoped_key, about, location from Users where username = ?', 
          [username], function (err, user) {

          if (err) {
            console.log('dbConnection error trying to retrieve user '+username,err);
          } else {

            expect( user[0].username ).to.equal(username);
            //remove the new entry from the database
            dbConnection.query('delete from users where username = ?', [username] , function(){

              done();

            });
          }
        });    
      });
    });

    xit('Should sign up new users using FB authentication', function (done) {
      //Make a request
      done();
    });

    xit('Should sign up new users using Google authentication', function (done) {
      //Make a request
    });

    it('Should reject an attempt to sign up using local authentication with a pre-existing username', function (done) {
      var password = "Smith";
      var username = "John1234";
      //signup user
      request({ method:'POST',
                uri:'http://localhost:3000/auth/signup',
                json: {
                  "username":username,
                  "password":password
                }
        },function(req,res){

            //status 201 means user has been added
            expect( res.statusCode ).to.equal(201);
            //checking to see that a token has been returned
            expect( res.body.token.length ).to.be.above(100);
            //try to signup same user
            request({ method:'POST',
                  uri:'http://localhost:3000/auth/signup',
                  json: {
                    "username":username,
                    "password":password
                  }

              },function(req,res){
                  //status 409 means user has already been signed up
                  expect( res.statusCode ).to.equal(409);

                  dbConnection.query('delete from users where username = ?', [username] , function(){
                    done();
                  });

                });
        }
      );
    });
  });

  describe('User authentication requirements - Signin', function () {
    var password = "Smith";
    var username = "John1234";
    // add user to database beforeEach
    beforeEach(function(done){
      //signup user
      request({ method:'POST',
                uri:'http://localhost:3000/auth/signup',
                json: {
                  "username":username,
                  "password":password
                }
        },function(req,res){
          done();
        }
      );
    });
    //delete the user from database afterEach
    afterEach(function(done){
      dbConnection.query('delete from users where username = ?', [username] , function(){
        done();
      });
    });
    // Test all possible methods of signin
    it('Should sign in existing users with local authentication', function (done) {
      request({
        method:"POST",
        uri:"http://localhost:3000/auth/signin",
        json: {
          "username":username,
          "password":password
        }
      },function(req,res){
        //status code 200 means successfull signin
        expect( res.statusCode ).to.equal(200);
        //check that a token is returned
        expect( res.body.token.length ).to.be.above(100);
        done();
      });
    });

    xit('Should sign in existing using FB authentication', function (done) {
      //Make a request
    });

    xit('Should sign in existing using Google authentication', function (done) {
      //Make a request
    });

    it('Should reject signin when a user inputs an invalid password ', function (done) {
        request({
        method:"POST",
        uri:"http://localhost:3000/auth/signin",
        json: {
          "username":username,
          "password":"sdkfjlaskjdf"
        }
        },function(req,res){
            //422 is invalid password, 404 is username not found, 200 is success
            expect( res.statusCode ).to.equal(422);
            done();
          });
    });

    it('Should reject signin when a user inputs an invalid username ', function (done) {
      request({
        method:"POST",
        uri:"http://localhost:3000/auth/signin",
        json: {
          "username":"alsdkjfaslkdf",
          "password":"sdkfjlaskjdf"
        }
      },function(req,res){
        //422 is invalid password, 404 is username not found, 200 is success
        expect( res.statusCode ).to.equal(404);
        done();
      });
    });
  });

  
  describe('Client-Thread interaction requirements', function () {

    xit('Should create a new thread', function (done) {
      //Make a request
    });

    xit('Should post a message to an existing thread', function (done) {
      //Make a request
    });

    xit('Should fetch all messages from a specific thread', function (done) {
      //Make a request
    });

    xit('Should fetch the titles of all existing threads', function(done) {
      //Make a request
    });

  });

  describe('Follower requirements', function () {

    it('Should fetch all followers for a specific user', function (done) {

    });

    it('Should allow a user to follow another user', function (done) {

    });

  });

  describe('Notifications requirements',function(){
    it('Should get followees statuses',function(){
      var password = "Smith";
      var userID =0912384091288940 ;
      var username = "John1234";
      request({ method:'GET',
                uri:'http://localhost:3000/status/followees/:userID',
                json: {
                  "username":username,
                  "password":password
                }
        },function(req,res){

            expect( res.statusCode ).to.equal(201);
            expect( res.body.token.length ).to.be.above(100);

            request({ method:'POST',
                  uri:'http://localhost:3000/auth/signup',
                  json: {
                    "username":username,
                    "password":password
                  }

              },function(req,res){

                  expect( res.statusCode ).to.equal(409);

                  dbConnection.query('delete from users where username = ?', [username] , function(){
                    done();
                  });

                });
        }
      ); 
    })
  });
  //TODO: 
    //Statuses
    //Message votes
    //Status votes
    //Notifications
});
