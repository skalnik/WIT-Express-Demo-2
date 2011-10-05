
/**
 * Module dependencies.
 */

var express = require('express'),
    csrf    = require('express-csrf');

var app = module.exports = express.createServer();

// Configuration

app.dynamicHelpers({
  csrf: csrf.token
});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({'secret': 'sekretz'}));
  app.use(csrf.check());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

var messages = [];

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express',
    messages: messages,
  });
});

app.post('/', function(req, res){
  messages.unshift(req.body.message);
  res.redirect('/');
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
