var User = require('../models/user.js');
var crypto = require('crypto');

function md5(password) {
	var hash = crypto.createHash('md5');
	return hash.update(password).digest('hex');
}

exports.create = function(req, res) {
	/*Model: C.create({}, function(err, doc){});*/
	req.body.password = md5(req.body.password);
	User.create(req.body, function(err, user) {
		if(err) res.send('used');
		res.json(user.toObject());
	});
};

exports.remove = function(req, res) {
	User.findByIdAndRemove(req.body._id, function(err, what) {
		if(err) res.send(err);
		else {
			res.send('ok');
		}
	});
};

exports.signin = function(req, res) {
	User.findByName(req.body.name, function(err, user) {
		if(user) {
			req.session.user = user;
			res.send((user.password == md5(req.body.password) ? 'OK' : 'Password is not correct'));
		} else {
			res.send('User is not found, please check your name');
		}
	});
};

exports.md5 = md5;
