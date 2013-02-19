define(['router'], function(index) {
	var init = function() {
		checkLogin(run);
	};

	var checkLogin = function(callback) {
		$.ajax({
			url: '/account/authenticated',
			type: 'POST',
			success: function(data) {
				return callback(data);
			},
			error: function(err) {
			} 
		});
	};

	var run = function(ok) {
		if(ok == 'true') {
			window.location.hash = 'index';
		} else if(ok == 'false') {
			window.location.hash = 'login';
		}
		Backbone.history.start();
	};

	return {
		init: init
	};
});
