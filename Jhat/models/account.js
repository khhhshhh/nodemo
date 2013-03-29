module.exports = function(config, mongoose) {
	var crypto = require('crypto');

	var accountSchema = new mongoose.Schema({
		email: {type: String, unique: true},
		password: {type: String},
		name: {type: String, unique: true},
		gender: {type: String},
		photoUrl: {type: String},
		biography: {type: String}
	});

	var Account = mongoose.model('Account', accountSchema);

	var _md5 = function(str) {
		return crypto.createHash('md5').update(str).digest('hex');
	};

	var registerCallback = function(err) {
		if(err) console.log(err);
		else {
			console.log('Some one register');
		}
	};

	var register = function(info) {
		/* info: {
		 * 		name:
		 * 		email:
		 * 		gender:
		 * 		password:
		 * 		biography:
		 * }
		 * */
		info.password = md5(info.password);
		var user = new Account(info);
		user.save();
	};

	var login = function(name, password, callback) {
		Account.findOne({name: name}).select(password).exec(function(err, doc){
			callback(err, doc);
		});
	}; 

	var changePassword = function(_id, password, callback) {
		Account.update({_id: _id}, {password: md5(password)}, {upsert: false}, function(err,doc){
			if(err) console.log(err);
			else {
				callback(doc);
			}
		});
	};

	return  {
		register: register,
		login: login,		
		changePassword: changePassword,
		Account: Account		
	};
};
