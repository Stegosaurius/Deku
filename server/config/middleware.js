var morgan      = require('morgan'), 
    bodyParser  = require('body-parser')
    //helpers     = require('./helpers.js'); // our custom middleware


module.exports = function (app, express) {
  //Express 4 allows us to use multiple routers with their own configurations

  //Create all routers we will need
    //ex: var userRouter = express.Router();

  //morgan is for logging get and post data to the console.
  app.use(morgan('dev'));
  //bodyParser is for processing body req information (ex: req.body)
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  //serving all of the static files from the client directory
  //app.use(express.static(__dirname + '/../../client'));

  //Make our app use all the routers we define 
    //ex: app.use('/api/users', userRouter); 

  //inject our routers into their respective route files
    //ex: require('../users/userRoutes.js')(userRouter);
};