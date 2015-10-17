//get the expect function from the chai module
var expect = require('chai').expect;

//require all of our models
var userModel = require('../../server/models/userModel.js');
var threadModel = require('../../server/models/threadModel.js');
var followerModel = require('../../server/models/followerModel.js');

//TODO:
//Potentially mock out the db, or open up a connection to it
//Check to see if a certain db query has been made
//Could pass a callback to methods and see if they get invoked
  //We could test the db functionality by explicitly calling the 
  //model methods with arguments we specify, and then checking 
  //the arguments in our callback to judge the success of the queries                    

/////////////////////
///////MODELS////////
/////////////////////

//unit and integration tests

describe('Server side model testing', function () {

  describe('userModel requirements', function () {

    it('should have a method called getAllUsers', function () {
      expect(userModel.getAllUsers).to.be.a('function');
    });

    it('should have a method called getUserByID', function () {
      expect(userModel.getUserByID).to.be.a('function');
    });

    it('should have a method called getUserByName', function () {
      expect(userModel.getUserByName).to.be.a('function');
    });

    it('should have a method called getUserByEmail', function () {
      expect(userModel.getUserByEmail).to.be.a('function');
    });

    it('should have a method called updateUser', function () {
      expect(userModel.updateUser).to.be.a('function');
    });

    it('should have a method called addUserByLocal', function () {
      expect(userModel.addUserByLocal).to.be.a('function');
    });

    it('should have a method called addUserByFB', function () {
      expect(userModel.addUserByFB).to.be.a('function');
    });

    it('should have a method called addUserByGoogle', function () {
      expect(userModel.addUserByGoogle).to.be.a('function');
    });

    it('should have a method called getProfilePhoto', function () {
      expect(userModel.getProfilePhoto).to.be.a('function');
    });

    it('should have a method called addProfilePhoto', function () {
      expect(userModel.addProfilePhoto).to.be.a('function');
    });

    it('should have a method called getFollowers', function () {
      expect(userModel.getFollowers).to.be.a('function');
    });

    it('should have a method called addFollower', function () {
      expect(userModel.addFollower).to.be.a('function');
    });

    it('should have a method called getStatuses', function () {
      expect(userModel.getStatuses).to.be.a('function');
    });

    it('should have a method called addStatus', function () {
      expect(userModel.addStatus).to.be.a('function');
    });
    
    it('should have a method called getNotifications', function () {
      expect(userModel.getNotifications).to.be.a('function');
    });
    
    it('should have a method called addNotification', function () {
      expect(userModel.addNotification).to.be.a('function');
    });
    
    it('should have a method called isValidPassword', function () {
      expect(userModel.isValidPassword).to.be.a('function');
    });

    it('should have a method called getPassword', function () {
      expect(userModel.getPassword).to.be.a('function');
    });


  });

  xdescribe('threadModel requirements', function () {

    it('should have a method called getAllUsers', function () {
      expect(userModel.getAllUsers).to.be.a('function');
    });

    it('should have a method called getAllUsers', function () {
      expect(userModel.getAllUsers).to.be.a('function');
    });

    it('should have a method called getAllUsers', function () {
      expect(userModel.getAllUsers).to.be.a('function');
    });

    it('should have a method called getAllUsers', function () {
      expect(userModel.getAllUsers).to.be.a('function');
    });
  });

  xdescribe('followerModel requirements', function () {

    it('should have a method called getAllUsers', function () {
      expect(userModel.getAllUsers).to.be.a('function');
    });

    it('should have a method called getAllUsers', function () {
      expect(userModel.getAllUsers).to.be.a('function');
    });

    it('should have a method called getAllUsers', function () {
      expect(userModel.getAllUsers).to.be.a('function');
    });

    it('should have a method called getAllUsers', function () {
      expect(userModel.getAllUsers).to.be.a('function');
    });
  });



});