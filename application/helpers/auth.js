const errors = require('../controllers/error-controller'),
	keys = require('../config/keys'),
	jwt = require('jsonwebtoken'),
	token_secret = keys.token_secret;

module.exports = {
	authenticatedPermisos: function(req, res, next){
		return (req.user)
			? next()
			: res.redirect('/401');
	},
	generateToken: (user) => {
		let u = {
			id: user.uid,
			firstName: user.firstName,
			lastName: user.lastName,
			image: user.image
		}
		return jwt.sign(u, token_secret, {
			expiresIn: 60 * 60 * 24 // expires in 24 hours
		})
	},
	desencriptarToken: (token) => {
		return new Promise( ( resolve, reject ) =>{
			jwt.verify(token, token_secret, (err, token) => {
		 		resolve(token)
			})
		})
	},
	authenticatedHeader: (req, res, next) => {
		let token = ''

		if (!req.headers['x-token'])
			return res.redirect('/401')

		token = req.headers['x-token']

		jwt.verify(token, token_secret, (err, token) => {
	 		if (err) {
	 			res.redirect('/401')
	 		} else {
	 			next()
	 		}
		})
	}
}