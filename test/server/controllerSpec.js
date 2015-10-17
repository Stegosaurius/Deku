//get the expect function from the chai module
var expect = require('chai').expect;

//Require all of our controllers
var userController = require('../../server/controllers/userController.js');
var threadController = require('../../server/controllers/threadController.js');
var followerController = require('../../server/controllers/followerController.js');

//Stub out model methods?
//TODO: controllers should invoke methods from their respective models
  //Could stub out those methods
//Check how many arguments controller methods accept
//Figure out how to test the res object, maybe actually invoking model
  //methods, OR stubing out the req and res objects and testing how
  //the controllers handle model method success/failure

/////////////////////
/////CONTROLLERS/////
/////////////////////

//unit and integration testing

describe('Server side controller testing', function () {

  /////////////////////
  ///userController////
  /////////////////////

  describe('userController requirements', function () {

    it('should have a method called getProfile', function () {
      expect(userController.getProfile).to.be.a('function');
    });

    it('should have a method called updateProfile', function () {
      expect(userController.updateProfile).to.be.a('function');
    });

    it('should have a method called getUser', function () {
      expect(userController.getUser).to.be.a('function');
    });

    it('should have a method called getProfilePhoto', function () {
      expect(userController.getProfilePhoto).to.be.a('function');
    });

    it('should have a method called addProfilePhoto', function () {
      expect(userController.addProfilePhoto).to.be.a('function');
    });

    it('should have a method called getFollowers', function () {
      expect(userController.getFollowers).to.be.a('function');
    });

    it('should have a method called addFollower', function () {
      expect(userController.addFollower).to.be.a('function');
    });

    it('should have a method called getStatuses', function () {
      expect(userController.getStatuses).to.be.a('function');
    });

    it('should have a method called updateStatus', function () {
      expect(userController.updateStatus).to.be.a('function');
    });

    it('should have a method called getNotifications', function () {
      expect(userController.getNotifications).to.be.a('function');
    });

    it('should have a method called createNotification', function () {
      expect(userController.createNotification).to.be.a('function');
    });
  });

  /////////////////////
  ///threadController//
  /////////////////////

  describe('threadController requirements', function () {

    it('should have a method called getAllThreads', function () {
      expect(threadController.getAllThreads).to.be.a('function');
    });

    it('should have a method called getThread', function () {
      expect(threadController.getThread).to.be.a('function');
    });

    it('should have a method called postToThread', function () {
      expect(threadController.postToThread).to.be.a('function');
    });

  });

  ///////////////////////
  //followerController///
  ///////////////////////

  describe('followerController requirements', function () {

    

    xit('should have a method called getProfile', function () {
      
    });

    xit('should have a method called getProfile', function () {
      
    });

    xit('should have a method called getProfile', function () {
      
    });

    xit('should have a method called getProfile', function () {

    });
  });

});

