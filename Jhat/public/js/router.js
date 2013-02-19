/*
 * 路由控制，获取views
 * */
define(['views/index' , 'views/register' , 'views/login' , 'views/changePassword']
		, function( IndexView , RegisterView , LoginView , ChangePasswordView) {
			var JhatRouter = Backbone.Router.extend({
				currentView: null,
				routes: {
					'index': 'index',
					'login': 'login',
					'register': 'register',
					'changePassword': 'changePassword'
				},
				changeView: function(view) {
					if(view) {
						this.currentView = view; 
						this.currentView.render();
					}
				},
				index: function() {
					this.changeView(new IndexView());
				},
				login: function() {
					this.changeView(new LoginView());
				},
				register: function() {
					this.changeView(new RegisterView());
				},
				changePassword: function() {
					this.changeView(new ChangeView());
				}
			});
			return new JhatRouter();
		});
