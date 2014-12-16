'use strict';

var mongoose = require('mongoose'),
	Check 	 = mongoose.model('Check');



var getErrorMessage = function(err) {
	if (err.errors) {
		for(var errName in err.errors){
			if (err.errors[errName.message]) return err.errors[errName].message;
		}
	}else {
		return 'Error de Servidor Desconocido' + err.code;
	}
};

// Crear un nuevo método controller para el manejo de errores
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Error de servidor desconocido'+ err.code;;
	}
};

// Crear un nuevo método controller para crear nuevos artículos
exports.create = function(req, res) {
	// Crear un nuevo objeto artículo
	var check = new Check(req.body);

	// Configurar la propiedad 'creador' del artículo
	check.creador = req.user;

	console.log(req.body);
	// Intentar salvar el artículo
	check.save(function(err) {
		if (err) {
			console.log(err);
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del artículo 
			res.json(check);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de artículos
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de artículos
	Check.find().sort('-creado').populate('creador', 'firstName lastName fullName')
	.populate('Todo','titulo')
	.exec(function(err, todos) {
		if (err) {
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del artículo 
			res.json(todos);
		}
	});
};

// Crear un nuevo método controller que devuelve un artículo existente
exports.read = function(req, res) {
	res.json(req.check);
};

// Crear un nuevo método controller que actualiza un artículo existente
exports.update = function(req, res) {
	// Obtener el artículo usando el objeto 'request'
	var check = req.check;

	// Actualizar los campos artículo
	check.titulo = req.body.titulo;
	check.descripcion = req.body.descripcion;

	// Intentar salvar el artículo actualizado
	check.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del artículo 
			res.json(check);
		}
	});
};

// Crear un nuevo método controller que borre un artículo existente
exports.delete = function(req, res) {
	// Obtener el artículo usando el objeto 'request'
	var check = req.check;

	// Usar el mécheck model 'remove' para borrar el artículo
	check.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del artículo 
			res.json(check);
		}
	});
};

// Crear un nuevo controller middleware que recupera un único artículo existente
exports.checkByID = function(req, res, next, id) {
	// Usar el método model 'findById' para encontrar un único artículo 
	Check.findById(id).populate('creador', 'firstName lastName fullName')
	.populate('Todo','titulo')
	.exec(function(err, check) {
		if (err) return next(err);
		if (!check) return next(new Error('Fallo al cargar la Tarea ' + id));

		// Si un artículo es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.check = check;

		// Llamar al siguiente middleware
		next();
	});
};

// Crear un nuevo controller middleware que es usado para autorizar una operación article 
exports.hasAuthorization = function(req, res, next) {
	// si el usuario actual no es el creador del artículo, enviar el mensaje de error apropiado
	if (req.check.creador.id !== req.user.id) {
		return res.status(403).send({
			message: 'Usuario no está autorizado'
		});
	}

	// Llamar al siguiente middleware
	next();
};