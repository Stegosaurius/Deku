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

    it('should have a method called getAvatarPath', function() {
      expect (userController.getAvatarPath).to.be.a('function');
    });

    it('should have a method called addAvatarPath',function(){
       expect (userController.addAvatarPath).to.be.a('function');
    });

    it('should have method called uploadAvatar',function(){
       expect (userController.uploadAvatar).to.be.a('function');
    });

    it('should have method called getNotifications',function(){
       expect (userController.getNotifications).to.be.a('function');
    });

    it('should have method called createNotification',function(){
       expect (userController.createNotification).to.be.a('function');
    });

    it('should have method called getScopedKey',function(){
       expect (userController.getScopedKey).to.be.a('function');
    });

    it('should have method called getUserTags',function(){
       expect (userController.getUserTags).to.be.a('function');
    });

    it('should have method called addUserTag',function(){
       expect (userController.addUserTag).to.be.a('function');
    });

    it('should have method called getAllTags',function(){
       expect (userController.getAllTags).to.be.a('function');
    });

    it('should have method called deleteUserTag',function(){
       expect (userController.deleteUserTag).to.be.a('function');
    });

    it('should have method called getPhotos',function(){
       expect (userController.getPhotos).to.be.a('function');
    });

    it('should have method called addPhotoURL',function(){
       expect (userController.addPhotoURL).to.be.a('function');
    });

    it('should have method called addPhotoS3',function(){
       expect (userController.addPhotoS3).to.be.a('function');
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

