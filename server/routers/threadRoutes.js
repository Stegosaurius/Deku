var threadController = require('../controllers/threadController.js');


module.exports = function (app) {
  //app === userRouter injected from middlware.js

  //Route for getting all threads
  app.get('/:page', threadController.getThreadsByPage);

  app.get('/messages/:threadID/:page', threadController.getMessagesByPage);

  //Route for posting a message to a particular thread
  app.post('/:userID/:threadID', threadController.addMessageToThread);

  // Create thread
  app.post('/:userID/:threadName', threadController.addThread);

  // Pass in the thread ID to be deleted
  app.delete('/:threadID', threadController.deleteThread);

  // Delete message from a thread
  app.delete('/messages/:messageID', threadController.deleteMessage);
}