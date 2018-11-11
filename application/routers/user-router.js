'use strict';

const uc = require('../controllers/user-controller'),
    express = require('express'),
    passport = require('passport'),
    router = express.Router(),
    { authenticatedHeader } = require('../helpers/auth');

router
    .get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))
    .get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/404' }),(req, res) => {
        res.redirect(`/auth/google/callback/${req.user.token}`)
    })
    .get('/user/info', authenticatedHeader, uc.info)

    .get('/login', (req, res) => { console.log('prueba'); res.redirect('/home')} )
    .post('/login', uc.login)
    .post('/login/login', uc.login)
    .post('/login/restpassword', uc.restpassword)
    .post('/login/restpassword/validarkey', uc.restpasswordValidarKey)
    
	//.get('/admin', authenticatedPermisos, uc.admin)
	//.get('/settings', authenticatedPermisos, uc.settings)
	.all('/login/logout', uc.logout);

module.exports = router;