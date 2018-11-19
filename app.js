var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const CMS = require('./models/cms.model');
var db = require('./db');

var cors = require('cors')
/**CORS (Allowing cross origin request) setup */


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cmsRouter = require('./routes/cms'); 
var app = express();



CMS.findOne({}).then(
  (Data) => {
    if (Data == null) {
      const homeData = {
        "page_title" : "home_page",
        "indexvalue":1,
    "content" : "<div class=\"jumbotron\">\n<div class=\"container-fluid\">\n<h1>Hello, world!</h1>\n\n<p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>\n\n<p><a class=\"btn btn-primary btn-lg\" href=\"#\">Learn more &raquo;</a></p>\n</div>\n</div>\n\n<div class=\"container-fluid\"><!-- Example row of columns -->\n<div class=\"row\">\n<div class=\"col-md-4\">\n<h2>Heading</h2>\n\n<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>\n\n<p><a class=\"btn btn-secondary\" href=\"#\">View details &raquo;</a></p>\n</div>\n\n<div class=\"col-md-4\">\n<h2>Heading</h2>\n\n<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>\n\n<p><a class=\"btn btn-secondary\" href=\"#\">View details &raquo;</a></p>\n</div>\n\n<div class=\"col-md-4\">\n<h2>Heading</h2>\n\n<p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\n\n<p><a class=\"btn btn-secondary\" href=\"#\">View details &raquo;</a></p>\n</div>\n</div>\n\n<hr /></div>\n<!-- /container -->\n\n<p>&copy; Company 2017-2018</p>\n",
      };
    const contactusData = {
        "page_title" : "contact_us",
        "indexvalue":2,
        "content" : '<div class=\"jumbotron text-center\">\n<h1>My First Bootstrap Page</h1>\n\n<p>Resize this responsive page to see the effect!</p>\n</div>\n\n<div class=\"container\">\n<div class=\"row\">\n<div class=\"col-sm-4\">\n<h3>Column 1</h3>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>\n\n<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>\n</div>\n\n<div class=\"col-sm-4\">\n<h3>Column 2X</h3>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>\n\n<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>\n</div>\n\n<div class=\"col-sm-4\">\n<h3>Column 3</h3>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>\n\n<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>\n</div>\n</div>\n</div>\n'
      };
      CMS.create(homeData, contactusData).then(data => {
        if (data) {
          console.log("App start for first time");
        } else {
          console.log('Saving process error');
        }
      });

    } else {
      console.log('app working fine');
    }
  },
);



app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/cms',cmsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
