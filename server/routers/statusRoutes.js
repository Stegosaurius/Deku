var statusController = require('../controllers/statusController.js');

module.exports = function (app) {

  app.get('/:username', statusController.getStatuses);
  
  app.post('/:userID', statusController.updateStatus);

  app.get('/followees/:userID', statusController.getFolloweesStatuses);

  app.delete('/:statusID', statusController.deleteStatus);

}