'use strict';

const mc = require('../controllers/main-controller'),
    express = require('express'),
    router = express.Router();

router
    .get('/', mc.raiz)
    .get('/menu', mc.menu)
    .get('/material', mc.material)
    .get('/audiencia', mc.audiencia);

module.exports = router;