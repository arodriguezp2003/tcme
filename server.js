process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose'),
	express  = require('./config/express'),
	passport = require('./config/passport'),
	db       = mongoose(),
	app		 = express(),
	passport = passport(),
	port	 = 3000;

app.listen(port);
console.log("Iniciado en el puerto: " + port + " mode:" +process.env.NODE_ENV);

module.exports = app;

