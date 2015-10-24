var statusController = require('../controllers/statusController.js');

module.exports = function (app) {

  app.get('/:id', statusController.getStatuses);
  
  app.post('/:id', statusController.updateStatus);

  app.get('/friends/:id', statusController.getFriendsStatuses);

  app.delete('/status/:id', statusController.deleteStatus);

}