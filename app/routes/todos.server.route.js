var users = require('../../app/controllers/users.server.controller'),
	todos = require('../../app/controllers/todos.server.controller');

module.exports = function (app){
	app.route('/api/todos')
		.get(todos.list)
		.post(users.requiredLogin, todos.create);

	app.route('/api/todos/:todoId')
		.get(todos.read)
		.put(users.requiredLogin, todos.hasAuthorization, todos.update)
		.delete(users.requiredLogin, todos.hasAuthorization,todos.delete)
	app.param('todoId', todos.todoByID);
};