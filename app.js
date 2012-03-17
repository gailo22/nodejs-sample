var express = require('express');

var app = module.exports = express.createServer(),
io = require('socket.io').listen(app);

// configuration
app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'mustache');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'your secret here'}));
	app.use(app.router);
	app.register('.mustache', require('stache'));
	app.use(express.static(__dirname + '/public'));
});

// helpers
app.helpers({
	helloworld: function(req, res) {
		return "Hello World";
	}
});

// dynamicHelpers
app.dynamicHelpers({
	hellopage: function(req, res) {
		return req.url;
	}
});

app.configure('development', function() {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

// Routes
app.get('/', function(req, res) {
	res.render('index', {
		title: 'Hello Express'
	});
});

app.listen(8000);
console.log("Express server listening on %d in %s mode", app.address().port, app.settings.env);
