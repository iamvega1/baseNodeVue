'use strict';

const um = require('../models/user-model'),
	sendMail = require('../helpers/sendEmail'),
	{ desencriptarToken } = require('../helpers/auth');

class UserController {

    login(req, res, next){
    	let user = {
			username: req.body.username,
			password: req.body.password
		},
		respuesta = {
			estado : false,
			message : 'Error: Usuario o password incorrecto'
		}


		um.login( user ).then( (docs) => {

			if(docs.estado){
				req.session.idUser = docs.idUser
				req.session.status = true
				req.session.roles = docs.roles

				respuesta.estado = true
				respuesta.uid = docs.idUser
				respuesta.roles = docs.roles
			}

			res.send(respuesta)
		})
    }

    info(req, res, next){
    	let token = '',
    		usuario = {}

    	token = req.headers['x-token']
    	desencriptarToken(token)
    	.then( user => {
    		usuario = user
    		return um.getOne('', user.id)
    	}).then( resp => {
    		usuario.mail = resp.mail
    		usuario.roles = {}

    		if (resp.status == 1)
    			usuario.roles = resp.roles
    		
    		res.send(usuario)
    	})

    	

    }

    restpassword(req, res, next){
    	let username = req.body.username,
    		respuesta = {
				estado : false,
				message : 'Error: Fallo la restauracion de password, por favor comuniquese con el responsable de la plataforma.'
			}

		um.restPassword( username ).then( user => {
			respuesta.estado = true
			respuesta.message = 'Exito: Se le han enviado más instrucciones a su dirección de correo'
			sendMail.restpassword( user )
			res.send(respuesta)
		}).catch( error => {
			respuesta.message = error.message
			res.send(respuesta)
		})
		
    }

    restpasswordValidarKey(req, res, next){
    	let user = {
	    		keypass : req.body.keypass,
	    		password : req.body.password
	    	},
    		respuesta = {
				estado : false,
				message : 'Error: Fallo la restauracion de password, por favor comuniquese con el responsable de la plataforma.'
			}
		um.validateKeyPass( user.keypass, user.password ).then( user => {
			respuesta.estado = true
			respuesta.message = 'Exito: Se actualizo el password'
			res.send(respuesta)
		}).catch( error => {
			respuesta.message = error.message
			res.send(respuesta)
		})
		
    }

    logout(req, res, next){
    	req.logout();
		res.send(true);
    }
    
}

module.exports = new UserController();