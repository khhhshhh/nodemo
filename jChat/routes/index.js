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
};

exports.profile = function(req, res) {
	res.render('profile', {
		user: req.session.user
	});
};

exports.profileUpdate = function(req, res) {
	res.render('profileUpdate', {
		user: req.session.user
	});
};

exports.passwordUpdate = function(req, res) {
	res.render('passwordUpdate', {
		user: req.session.user
	});
};

exports.friendSeeking = function(req, res) {
	User.find({_id:{$ne: req.session.user._id}}) // find all the users the not himself
		.exec(function(err, users) { 
			res.render('friendSeeking', {
				user: req.session.user,
				users: users || err
			});
		});
};
