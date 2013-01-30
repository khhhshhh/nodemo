var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/jChat');

db.on('open', function() {
	console.log('Users db connect');
});

db.on('error', function() {
	console.log('Users db error');
});

// User's Schema
var user = Schema({
	age: Number
	, name: String
	, profile: String
	, gender: String
	, password: String
	, email: String
	, friends: Array
});

// 通过用户名可以找到用户
user.statics.findByName = function(n, cb) {
	this.findOne({name: n}, cb);
};

var User = mongoose.model('User', user);

module.exports = User;
