
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'Express' });
};

exports.foo = function(req, res){
	res.render('foo', {
		name: req.params.name || 'khhhshhh', 
		password: req.params.password || '12345'
	});
};
