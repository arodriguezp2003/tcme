var users = require('../../app/controllers/users.server.controller'),
	todos = require('../../app/controllers/todos.server.controller'),
	checks = require('../../app/controllers/check.server.controller');


module.exports = function (app){
	app.route('/api/checks')
		.get(checks.list)
		.post(users.requiredLogin, checks.create);

	app.route('/api/checks/:checkId')
		.get(checks.read)
		.put(users.requiredLogin, checks.hasAuthorization, checks.update)
		.delete(users.requiredLogin, checks.hasAuthorization,checks.delete)
	app.param('checkId', checks.checkByID);
};