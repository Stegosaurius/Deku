var threadController = require('../controllers/threadController.js');


module.exports = function (app) {
  //app === userRouter injected from middlware.js

  //Route for getting all threads
  app.get('/:page', threadController.getThreadsByPage);

  app.get('/:threadID/:page', threadController.getMessagesByPage);

  //Route for posting a message to a particular thread
  app.post('/:id', threadController.addMessagesToThread);

  // Pass in the thread ID to be deleted
  app.delete('/:id', threadController.deleteThread);
}