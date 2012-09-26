/*
 *	Global configurations
 *	@port, @swig template engine (http://github.com/paularmstrong/swig)
 *
 *	windows: SET NODE_ENV=name / linux: NODE_ENV=name
 */
var swig = require('consolidate').swig;

exports.port = 8080;

exports.environment = function (express, app) {
	app.configure(function() {
		app.use(express.logger());
		app.use(express.bodyParser());
		app.engine('html', swig);
		app.set('view engine', 'html');
		app.set('view options', {layout: false});
		app.use(express.static('./media'));
	});

	app.configure('development', function() {
		require('swig').init({ root: './views', allowErrors: true });
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
		console.log('DEV configuring');
	});

	app.configure('production', function() {
		require('swig').init({ root: './views', allowErrors: false });
		app.use(express.errorHandler());
		console.log('PROD configuring');
	});
}