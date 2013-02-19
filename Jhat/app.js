
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , Account = require('./models/account')
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
  app.use(express.cookieParser());
  app.use(express.session({
	  secret: 'Jhat'
  }));

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.post('/register', function(req, res){
	if(req.body.name && req.body.email && req.body.password) {
		Account.register(req.body);
		res.send('OK');
	} else {
		res.send('You infomation is not correct');
	}
});

app.post('/account/authenticated', function(req, res) {
	if(req.session.account) {
		res.send('true');
	} else {
		res.send('false');
	}
});

app.post('/login', function(req, res) {
	Account.login(req.body.name, req.body.password, function(err, doc) {
		if(err) res.send('Login Error');
		else {
			res.send('Welcomoe back' + doc.name);
		}
	});
});

app.listen(3000);
