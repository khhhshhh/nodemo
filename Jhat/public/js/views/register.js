define(['text!templates/register.html'], function(registerTemplate){
	var RegisterView = Backbone.View.extend({
		el: $('#content'),

		events: {
			'submit': 'register'
		},

		register: function(){
			$.ajax({
				url: '/register',
				type: 'POST',
				data: $('registerForm').serialize(),
				success: function(data) {
					alert(data);
				},
				error: function(err) {
					alert(err);
				}
			});
		},
		
		render: function() {
			this.$el.html(registerTemplate);
		}
	});

	return RegisterView;
});
