var express = require('express')
  , MongoStore = require('connect-mongo')(express)
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , mongoose = require('mongoose')
  , User = require('./models/user')
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
	  secret: 'jChat',
	  store: new MongoStore({
		  db: 'jChat'
	  })
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

});

app.get('/', routes.index);

app.get('/layout', routes.layout);

app.get('/signup', routes.signup);

app.get('/profile', routes.profile);

app.get('/profileUpdate', routes.profileUpdate);

app.post('/profileUpdate', user.profileUpdate);

app.get('/signin', routes.signin);

app.post('/signin', user.signin);

app.get('/signout', routes.signout);

app.post('/userCreate', user.create);

app.post('/userRemove', user.remove);

app.get('/passwordUpdate', routes.passwordUpdate);

app.post('/passwordUpdate', user.passwordUpdate);

app.get('/friendSeeking', routes.friendSeeking);

app.post('/addFriend', user.addFriend);

app.get('/friendsList', routes.friendsList);

app.post('/removeFriend', user.removeFriend);

/*Query: MongoDB中的限制操作都可以用函数表示~！！！
 * C.find({}).where('age').gt(18)
 * 		   .where('gender').equals('male')
 * 		   .where('class').in(['1', '2', '3'])
 * 		   .sort('name')
 * 		   .select('name')
 * 		   .exec(callback);
 *
 * 限制条件直接用查询也行，但是如果是skip， limit，sort就要用函数了。。 ?
 * C.find({age: {age: {$gt:18}, gender: 'male', }})
 * 	.limit(10)
 * 	.sort('namd');
 * */

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
