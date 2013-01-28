
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

mongoose.connect('mongodb://localhost:27017/jay');
var db = mongoose.connection;
db.on('open', function() {
	console.log('conncet to db');
});

var user = mongoose.Schema({
	name: String
});

user.methods.say = function() {
	return this.name;
};

var User = mongoose.model('User', user);

var i = 0 
app.get('/', function(req, res){
	User.find({name: 'Harry Potter'}, function(err, users){
		console.log(users.forEach);
	});
	res.end('ok');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
