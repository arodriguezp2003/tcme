'use strict';

var mongoose = require('mongoose'),
	Todo 	 = mongoose.model('Todo');



var getErrorMessage = function(err) {
	if (err.errors) {
		for(var errName in err.errors){
			if (err.errors[errName.message]) return err.errors[errName].message;
		}
	}else {
		return 'Error de Servidor Desconocido'
	}
};

// Crear un nuevo método controller para el manejo de errores
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Error de servidor desconocido';
	}
};

// Crear un nuevo método controller para crear nuevos artículos
exports.create = function(req, res) {
	// Crear un nuevo objeto artículo
	var todo = new Todo(req.body);

	// Configurar la propiedad 'creador' del artículo
	todo.creador = req.user;

	console.log(todo);
	// Intentar salvar el artículo
	todo.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del artículo 
			res.json(todo);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de artículos
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de artículos
	Todo.find().sort('-creado').populate('creador', 'firstName lastName fullName').exec(function(err, todos) {
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
	res.json(req.todo);
};

// Crear un nuevo método controller que actualiza un artículo existente
exports.update = function(req, res) {
	// Obtener el artículo usando el objeto 'request'
	var todo = req.todo;

	// Actualizar los campos artículo
	todo.titulo = req.body.titulo;
	todo.contenido = req.body.contenido;

	// Intentar salvar el artículo actualizado
	todo.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del artículo 
			res.json(todo);
		}
	});
};

// Crear un nuevo método controller que borre un artículo existente
exports.delete = function(req, res) {
	// Obtener el artículo usando el objeto 'request'
	var todo = req.todo;

	// Usar el método model 'remove' para borrar el artículo
	todo.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del artículo 
			res.json(todo);
		}
	});
};

// Crear un nuevo controller middleware que recupera un único artículo existente
exports.todoByID = function(req, res, next, id) {
	// Usar el método model 'findById' para encontrar un único artículo 
	Todo.findById(id).populate('creador', 'firstName lastName fullName').exec(function(err, todo) {
		if (err) return next(err);
		if (!todo) return next(new Error('Fallo al cargar la Tarea ' + id));

		// Si un artículo es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.todo = todo;

		// Llamar al siguiente middleware
		next();
	});
};

// Crear un nuevo controller middleware que es usado para autorizar una operación article 
exports.hasAuthorization = function(req, res, next) {
	// si el usuario actual no es el creador del artículo, enviar el mensaje de error apropiado
	if (req.todo.creador.id !== req.user.id) {
		return res.status(403).send({
			message: 'Usuario no está autorizado'
		});
	}

	// Llamar al siguiente middleware
	next();
};