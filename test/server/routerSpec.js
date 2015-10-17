//get the expect function from the chai module
var expect = require('chai').expect;
var express = require('express');
var passport = require('passport');


//define an app and passport variables to pass to the routers
//var app = express();
//May want to sub out passport methods for the time being

//define our routers
var userRouter = express.Router();
var threadRouter = express.Router();
var followerRouter = express.Router();

//require all of our routers, pass fake app and passport objects as args
userRouter = require('../../server/routers/userRoutes.js')(userRouter, passport);
threadRouter = require('../../server/routers/threadRoutes.js')(threadRouter, passport);
followerRouter = require('../../server/routers/followerRoutes.js')(followerRouter, passport);

//TODO:
  //May want to require our controllers and mock out their methods
  //Test each router with the different routes. One way to measure 
    //success of this is to check that the correct controller method
    //gets invoked based on the route.
  //How to handle req and res?



///////////////////////
///////ROUTERS/////////
///////////////////////

describe('Server side routing', function () {

  describe('userRouter requirements', function () {
    
  });

  describe('threadRouter requirements', function () {
    
  });

  describe('followerRouter requirements', function () {

  })


})