var followerController = require('../controllers/followerController.js');


module.exports = function (app) {
  //app === userRouter injected from middlware.js

  app.get('/followers/:username', followerController.getFollowers);

  app.get('/followees/:username', followerController.getFollowees);

  app.post('/:followerID/:followeeName', followerController.follow);

  app.delete('/:followerID/:followeeName', followerController.unfollow);
  
}