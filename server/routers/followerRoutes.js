var followerController = require('../controllers/followerController.js');


module.exports = function (app) {
  //app === userRouter injected from middlware.js

  app.get('/:username', followerController.getFollowers);

  app.post('/:userID/:followerName', followerController.addFollower);

  app.delete('/:userID/:followerName', followerController.unfollow);
  
}