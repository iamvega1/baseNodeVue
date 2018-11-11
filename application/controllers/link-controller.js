'use strict';

const lm = require('../models/link-model');

class LinkController {

    getAll(req, res, next){
        let page, tag, categoria, respuesta = {}

        page = req.query.page != undefined ? (req.query.page - 1) : 0
        tag = req.query.tag != undefined ? req.query.tag : 0
        categoria = req.query.categoria != undefined ? req.query.page : 'nuevo'

        lm.getList(tag, categoria, page)
        .then(obj => {
            respuesta.status = true
            respuesta.lista = obj.lista
            respuesta.total = obj.total
            respuesta.totalPages = obj.totalPages
            respuesta.page = obj.page
            res.send(respuesta)
        })
        .catch( err => {
            respuesta.status = false
            respuesta.message = 'Error 500: Fallo GETALL'
            res.send(respuesta)
        })

        //res.send(true)
    }

    getOne(req, res, next){
        let nid

        nid = req.query.nid

        if (nid == undefined){
            res.statusCode = 400
            res.statusMessage = 'Not found Params'
            return res.send()
        }

        lm.getLink(nid)
        .then(obj => {
            return res.send(obj)
        })
    }

    getlink(req, res, next){
        let resp = {
            estado : false
        }

        if (req.params.nid == 'undefined')
            return res.send(resp)

        lm.getLink(req.params.nid)
        .then(obj => {
            resp.estado = true
            resp.data = obj
            return res.send(resp)
        })
    }

    getlinkDetalle(req, res, next){
        let nid =  req.query.nid,
            resp = {
                estado : false,
                message: 'Error: Parametros incorrectos'
            }

        if (!req.query.nid)
            return res.send(resp)
        Promise.all([
            lm.getTitleAndUser( nid ),
            lm.getLinkDetalle( nid, 'audiencia' ), 
            lm.getLinkDetalle( nid, 'material' ), 
            lm.getLinkDetalle( nid, 'categoria' ), 
            lm.getLinkDetalle( nid, 'tags' )])
        .then( values => {
            res.estado = true
            resp.title = values[0].title
            resp.username = values[0].name
            resp.created = values[0].created
            resp.audiencia = values[1].items
            resp.material = values[2].items
            resp.categoria = values[3].items
            resp.tags = values[4].items
            return res.send(resp)
        })
    }

    gettotal(req, res, next){
        let tag = 0,
            resp = {
                estado : false
            }

        if (req.params.tag)
            tag = parseInt(req.params.tag, 10)
        if(tag == 0)
            tag = null
        
        lm.getTotal( tag )
        .then( value => {
            resp.estado = true
            resp.total = value
            res.send(resp)
        })
    }

    list(req, res, next){
        let tag = 0,
        categoria = 'nuevo',
        page = 0

        if (req.params.page)
            page = (parseInt(req.params.page, 10) - 1)
        if (req.params.tag)
            tag = req.params.tag
        if (req.params.categoria)
            categoria = req.params.categoria

        lm.getList(tag, categoria, page)
        .then(obj => {
            res.send(obj)
        })
    }

    voto(req, res, next) {
        let nid,
            resp = {
                estado: false
            }

        if(req.params.nid)
            nid = req.params.nid

        lm.updateVoto(nid)
        .then( result => {
            resp.estado = true
            res.send( resp )
        })      
    }

    save(req, res, next) {
        let resp = {
                estado : false,
                message : 'Error: Fallo el registro del nuevo link.'
            }
            
        let link = {
            uid : req.body.uid,
            title : req.body.title,
            descripcion : req.body.descripcion,
            url : req.body.url,
            file : req.body.file,
            tags : req.body.tags.split(',')
        }

        if (!req.files)
            res.send(resp)

        link.image = req.files.image
        link.image.mv(`dist/sites/default/files/${link.image.name}`, err => {
            resp.estado = true
            //resp.message = 'ingreso'
            if (err){
                resp.estado = false
                resp.message = 'No se pudo subir la imagen'
            }
            res.send(resp)
        })
        
        
    }
}

module.exports = new LinkController();