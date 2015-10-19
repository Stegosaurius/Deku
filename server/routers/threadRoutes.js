var threadController = require('../controllers/threadController.js');


module.exports = function (app) {
  //app === userRouter injected from middlware.js

  //Route for getting all threads
  app.get('/', function (req, res) {
    threadController.getAllThreads(req, res);
  });

  //Route for getting all the messages from one 
  //particular thread
  app.get('/:id', function (req, res) {
    //Get the id
    var id = req.params.id;
    threadController.getThread(req, res, id);
  });

  //Route for posting a message to a particular thread
  app.post('/:id', function (req, res) {
    var id = req.params.id;
    threadController.postToThread(req, res, id);
  })
  
}