
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
	age: Number
	, name: String
	, profile: String
	, gender: String
	, password: String
	, email: String
	, friends: Array
});

/*Virtual: 虚拟属性*/
user.virtual('something').get(function(){
	return this.age + this.name;
});

/*methods: 实例方法*/
user.methods.say = function() {
	return this.name;
};

/*statics: 类方法*/
user.statics.findByName = function(n) {
	return User.find({name: n});
}

var User = mongoose.model('User', user);

app.get('/', function(req, res) {
	/*Model: C.find({})*/
	User.find({}, function(err, us) {
		res.render('index', {
			users: us
		});
	});
});

app.post('/create', function(req, res) {
	/*Model: C.create({}, function(err, doc){});*/
	User.create(req.body, function(err, user) {
		res.json(user.toObject());
	});
});

app.post('/remove', function(req, res) {
	User.findByIdAndRemove(req.body._id, function(err, what){
		if(err) res.send(err);
		else {
			res.send('ok');
		}
	});
});


/*Documents*/
app.get('/findById/:id', function(req, res) {
	/*Doc: findById(id, function(err, doc){})*/

	User.findById(req.params.id, function(err, user) {
		if(err) res.send('Not found');
		else {
			res.json(user.toJSON());
		}
	});
});

app.get('/update/:name/:newName', function(req, res) {
	/*Doc: update({contitions}, {update}, {options:[upsert, safe, multi], callback(err, count)})*/

	User.update(
		{name: req.params.name}
		, {$set:{name:req.params.newName}}
		, {safe: true, upsert: false, multi: true} 
		, function(err, count) {
			if(err) res.send('Not found');
			else {
				res.json(count);
			}
		});
});

app.get('/findByIdAndUpdate/:id/:name', function(req, res) {
	/*Doc: findByIdAndUpdate(id, {update}, function(err, user){})*/

	User.findByIdAndUpdate(
		req.params.id
		, {$set: {name: req.params.name}}
		, function(err, user){
			if(err) res.send('Not found');
			else {
				res.json(user.toJSON());
			}
		});
});

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
