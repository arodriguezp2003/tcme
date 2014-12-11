process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('./config/express'),
	app		= express(),
	port	= 3000;

app.listen(port);
console.log("Iniciado en el puerto: " + port + " mode:" +process.env.NODE_ENV);

module.exports = app;

