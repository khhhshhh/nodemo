define(['text!templates/login.html'], function(loginTemplate) {
	var LoginView = Backbone.View.extend({

		el: $('#content'),

		events: {
			'submit': 'login'
		},

		login: function() {
			$.ajax({
				url: '/login',
				type: 'POST',
				data: $('#loginForm').serialize(),
				success: function(data) {
					alert(data);
				},
				error: function() {
					alert('Connect Error');
				}
			});
		},

		render: function() {
			this.$el.html(loginTemplate);
		} 
	});
	return LoginView;
});
