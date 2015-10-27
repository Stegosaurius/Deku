var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');

module.exports = function (app, express) {
  //Express 4 allows us to use multiple routers with their own configurations

  //Create all routers we will need
  //TODO: make authRouter
  var userRouter = express.Router();
  var followerRouter = express.Router()
  var threadRouter = express.Router();
  var statusRouter = express.Router();
  var authRouter = express.Router();

  //morgan is for logging get and post data to the console.
  app.use(morgan('dev'));
  //bodyParser is for processing body req information (ex: req.body)
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cookieParser());
  //serving all of the static files from the client directory
  app.use(express.static(__dirname + '/../../client'));
 

  //Make our app use all the routers we define 
  app.use('/users', userRouter); 
  app.use('/follow', followerRouter);
  app.use('/status', statusRouter);
  app.use('/threads', threadRouter);
  app.use('/auth', authRouter);

  //inject our routers into their respective route files
  //TODO: Add inject Auth router into authRoutes.js
  require('../routers/userRoutes.js')(userRouter);
  require('../routers/authRoutes.js')(authRouter, passport);
  require('../routers/followerRoutes.js')(followerRouter);
  require('../routers/threadRoutes.js')(threadRouter);
  require('../routers/statusRoutes.js')(statusRouter);

  //inject passport into passport configuration file
  require('../config/passport')(passport);

};