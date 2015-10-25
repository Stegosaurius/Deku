var followerController = require('../controllers/followerController.js');


module.exports = function (app) {
  //app === userRouter injected from middlware.js

  app.get('/:username', followerController.getFollowers);

  app.post('/:id', followerController.addFollower);

  app.delete('/:id', followerController.unfollow);
  
}