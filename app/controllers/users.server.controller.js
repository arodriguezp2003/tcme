'use strict'


var User = require('mongoose').model('User'),
	passport = require('passport');


var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch(err.code){
			case 11000:
			case 11001:
				message = 'Usuario ya Existe';
				break;
			default:
				message = 'Se ha producido un error';
		}
	} else {
		for(var errName in err.errors) {
			if (err.errors[errName].message) message =err.errors[errName].message;
		}
	}

	return message;
};
exports.renderSignin=function(req,res,next){
	if (!req.user) {
		res.render('signin', {
			title: 'Sign-in Form',
			message: req.flash('error') || req.flash('info')
		});
	}else {
		res.redirect('/');
	}
};
exports.renderSignup=function(req,res,next){
	if (!req.user) {
		res.render('signup', {
			title: 'Sign-UP Form',
			message: req.flash('error') 
		});
	}else {
		res.redirect('/');
	}
};
exports.signup = function(req,res,next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;
		user.provider = 'local';

		user.save(function(err){
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error',message);
				return res.redirect('/signup');
			}

			req.login(user,function(err){
				if (err) return  next(err);

				return res.redirect('/')
			});
		});
	} else {
		return res.redirect('/');
	}
};

exports.signout = function(req,res){
	req.logout();
	res.redirect('/');
};
exports.create = function(req,res,next){
	
	 var user = new User(req.body);
	user.save(function(err){
		if (err){
			return next(err);
		}else {
			res.json(user);
		}
	});

};

exports.list = function(req,res,next){
	User.find({},function(err,users){
		if (err) {
			return next(err);
		}else{
			res.json(users);
		}
	})
};
exports.read = function(req,res){
	res.json(res.user);
};

exports.delete =function(req,res,next){
	req.user.remove(function(err){
		if (err) {
			return next(err);
		}else {
			res.json(user);
		}

	});
};
exports.update =function(req,res,next){
	User.findByAndUpdate(req.user.id,req.body,function(err,user){
		if (err) {
			return next(err);
		}else {
			res.json(user);
		}

	});
};
exports.userByID = function(req,res,next,id){
	User.findOne({
		_id : id
	},function(err,user){
		if (err) {
			return next(err);
		}else {
			req.user = user; 
			next();
		}
	});
}
