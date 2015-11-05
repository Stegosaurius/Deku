var statusController = require('../controllers/statusController.js');

module.exports = function (app) {

  app.get('/:username/:currentuserID', statusController.getStatuses);
  
  app.post('/:userID', statusController.updateStatus);

  app.post('/vote/:userID/:statusID', statusController.likeStatus);

  app.delete('/vote/:userID', statusController.unlikeStatus);

  app.get('/followees/:userID', statusController.getFolloweesStatuses);

  app.delete('/:statusID', statusController.deleteStatus);

}