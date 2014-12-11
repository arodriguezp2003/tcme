var config   = require('./config'),
	mongoose = require('mongoose');


module.exports = function() {
	var db = mongoose.connect(config.db);
	//cargar todos los modelos
	require('../app/models/user.server.model.js');
	return db;
} 