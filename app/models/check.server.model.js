var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var CheckSchema = new Schema({
	nombre: String,
	creado: {
		type: Date,
		default : Date.now
	},
	creador: {
		type: Schema.ObjectId,
		ref	: 'User'
	},
	todo: {
		type: Schema.ObjectId,
		ref	: 'Todo'
	},
	checkin: {
		type : Boolean,
		default: true
	}
});

mongoose.model('Check',CheckSchema);