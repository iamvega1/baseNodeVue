'use strict';

const express = require('express'),
	lc = require('../controllers/link-controller'),
    router = express.Router();

router
	.get('/link', lc.getOne)
	.get('/link/all', lc.getAll)
	.get('/api/link/:nid', lc.getlink)
	.get('/api/detalle/link', lc.getlinkDetalle)
	.put('/link/voto/:nid', lc.voto)
    .get('/links/tag/:tag/categoria/:categoria/page/:page', lc.list)
    .get('/links/total/tag/:tag', lc.gettotal)
    .post('/api/link', lc.save);

module.exports = router;