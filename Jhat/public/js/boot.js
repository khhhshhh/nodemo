require.config({
	paths: {
		jquery: '/js/lib/jquery',
		backbone: '/js/lib/backbone',
		text: '/js/lib/text',
		underscore: '/js/lib/underscore',
		templates: '/templates'
	},
	shim: {
		'backbone': ['underscore', 'jquery'],
		'Jhat': ['backbone']
	}
});

require(['Jhat'], function(Jhat) {
	Jhat.init();
});
