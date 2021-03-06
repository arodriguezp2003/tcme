var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var TodoSchema = new Schema({
	creado: {
		type: Date,
		default : Date.now
	},
	titulo: {
		type: String,
		default: '',
		trim: true ,
		required : 'El titulo no puede estar en blanco'
	},
	descripcion: {
		type: String,
		default : '',
		trim : true
	},
	monto : {
		type: Number,
		default: 0
	},
	color : String, 
	creador: {
		type: Schema.ObjectId,
		ref	: 'User'
	}
});

mongoose.model('Todo',TodoSchema);