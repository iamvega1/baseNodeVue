'use strict';

class Errors {
	http401(req, res, next)	{
		let err = new Error();
		err.status = 401;
		err.statusText = 'NOT FOUND';
		err.src ="/img/danger.jpeg";
		err.message ="You are not authorized to access this page.";
		let rol = req.user ? req.user.rol : false;
		res.render('error/error', {error: err, rol: rol });
	}

	http404(req, res, next)	{
		let err = new Error();
		err.status = 404;
		err.statusText = 'NOT FOUND';
		err.src ="/img/perro.jpeg";
		err.message ="I´m sorry";
		let rol = req.user ? req.user.rol : false;
		res.render('error/error', {error: err, rol: rol });
	}

	http500(req, res, next)	{
		let err = new Error();
		err.status = 500;
		err.statusText = 'INTERNAL SERVER ERROR';
		let rol = req.user ? req.user.rol : false;
		res.render('error/error', {error: err, rol: rol });
	}
}

module.exports = new Errors();