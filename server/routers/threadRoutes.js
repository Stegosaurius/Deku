var threadController = require('../controllers/threadController.js');


module.exports = function (app) {
  //app === userRouter injected from middlware.js

  //Route for getting all threads
  app.get('/', threadController.getAllThreads);

  //Route for getting all the messages from one 
  //particular thread
  app.get('/:id', threadController.getThread);

  //Route for posting a message to a particular thread
  app.post('/:id', threadController.postToThread);
}