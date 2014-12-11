process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose'),
	express  = require('./config/express'),
	db       = mongoose(),
	app		 = express(),
	port	 = 3000;

app.listen(port);
console.log("Iniciado en el puerto: " + port + " mode:" +process.env.NODE_ENV);

module.exports = app;

