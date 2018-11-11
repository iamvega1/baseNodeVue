'use strict';

const la = require('../models/audiencia-model'),
    matm = require('../models/material-model'),
    mm = require('../models/main-model')

class MainController {

    raiz(req, res, next) {
        var rol = req.user ? req.user.rol.valor : false;
    	res.render('home');
    }

    prueba(req, res, next){
        res.render('home', {
            host: 'face',
        });
    }
    
    menu(req, res, next){
        mm.getMenu((data) => {
            res.send(data)
        });
    }

    audiencia(req, res, next) {
        let resp = {
            estado : false
        }
        console.log('ingreso audiencia')
        la.getAudiencia()
        .then( value => {
            console.log(value)
            resp.estado = true
            resp.audiencia = value
            res.send( resp )
        })
    }

    material(req, res, next) {
        let resp = {
            state : false
        }

        matm.getAll()
        .then( value => {
            resp.state = true
            resp.list = value
            resp.detalle = 'material'
            res.send( resp )
        })
    }
}

module.exports = new MainController();