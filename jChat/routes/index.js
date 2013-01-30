var User = require('../models/user');

exports.index = function(req, res) {
	var u = req.session.user || null;
	res.render('index', {
		user: u
	});
};

exports.layout = function(req, res) {
	res.render('layout');
};

exports.signup = function(req, res) {
	User.find({}, function(err, us) {
		res.render('signup', {
			users: us
		});
	});
};

exports.signin = function(req, res) {
	res.render('signin');
};

exports.signout = function(req, res) {
	req.session.user = null;
	res.render('index', {
		user: null
	});
}
