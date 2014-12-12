'use strict';

var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app){
	app.route('/users')
		.post(users.create)
		.get(users.list);

	app.route('/users/:userId')
		.get(users.read)
		.put(users.update)
		.delete(users.delete);

	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);

	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local',{
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
		}));

	app.route('/signout')
		.get(users.signout);

	//google 
	app.get('/oauth/google',passport.authenticate('google',{
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		],
		failureRedirect: '/signin'
	}));
	
	app.get('/oauth/google/callback',passport.authenticate('google',{
		successRedirect: '/',
		failureRedirect: '/signin',
	}));
	app.param('userId',users.userByID);
}