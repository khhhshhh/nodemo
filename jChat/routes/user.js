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

exports.profileUpdate = function(req, res) {
	if(req.session.user) {
		var body = req.body;
		var user = req.session.user;

		User.findByIdAndUpdate(user._id, {
			name: body.name
			,nickname: body.nickname
			,email: body.email
			,gender: body.gender
			,age: body.age
			,profile: body.profile
		}, function(err, newUser){
			console.dir(err);
			console.dir(newUser);
			if(err) res.send('Error');
			else {
				req.session.user = newUser; 
				res.redirect('/profile');
			}
		});
	} else {
		res.redirect('/signin');
	}

};

exports.passwordUpdate = function(req, res) {
	var opsw = md5(req.body.opassword);
	var user = req.session.user;

	if(opsw !== user.password) {
		res.send('Old password is not correct');
	} else {
		var npsw = md5(req.body.npassword);
		User.findByIdAndUpdate(user._id, {
			password: npsw
		}, function(err, newUser){
			if(err) res.send('Update failed');
			else {
				req.session.user = newUser;
				res.send('Update successfully');
			}
		});
	}

};

exports.md5 = md5;
