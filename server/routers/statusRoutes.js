var statusController = require('../controllers/statusController.js');

module.exports = function (app) {

  app.get('/:username', statusController.getStatuses);
  
  app.post('/:id', statusController.updateStatus);

  app.get('/followees/:userID', statusController.getFolloweesStatuses);

  app.delete('/:id', statusController.deleteStatus);

}