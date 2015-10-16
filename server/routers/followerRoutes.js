var followerController = require('../controllers/followerController.js');


module.exports = function (app) {
  //app === userRouter injected from middlware.js

  for (var route in followerController) {
    router.route("/" + route)
      .get(followerController[route].get)
      .post(followerController[route].post);
  }
  //Handle different routes and invoke appropriate controller functions
  //TODO Make sure this naming convention works
    //ex: app.get('/signedin', function(req, res){
    //   userController.checkAuth(req, res)
    // })
  
}