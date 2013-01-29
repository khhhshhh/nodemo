
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.signUp = function(req, res) {
	/*Model: C.create({}, function(err, doc){});*/
	User.create(req.body, function(err, user) {
		res.json(user.toObject());
	});
};
