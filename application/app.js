'use strict';

const express = require('express'),
    //pug = require('pug'),
    cors = require('cors'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    //session = require('express-session'),
    restFul = require('express-method-override')('_method'),
    fileUpload = require('express-fileupload'),
    link = require('./routers/link-router'),
    main = require('./routers/main-router'),
    cm = require('./controllers/main-controller'),
    passport = require('passport'),
    user = require('./routers/user-router'),
    //error = require('./controllers/error-controller'),
    favicon = require('serve-favicon')(`${__dirname}/public/static/img/404.91c90e9.jpg`),
    publicDir = express.static(`${__dirname}/public`),
    viewDir = `${__dirname}/views`,
    //optSession = { secret:'secret', saveUninitialized: true, resave: true },
    port = (process.env.PORT || 3000);


require('./helpers/passport')(passport);

let app = express();

app
    .set( 'views', viewDir )
    .set( 'view engine', 'pug' )
    .set( 'port', port )

    //.use( session(optSession) )
    .use( bodyParser.json() )
    .use( bodyParser.urlencoded({ extended: false }) )
    .use( cors() )
    .use( morgan('dev') )
    .use( fileUpload() )
    .use( restFul )
    .use( passport.initialize() )
    .use( passport.session() )
    .use( publicDir )
    .use( favicon )
    .use( link )
    .use( user )
    .use( main )
    .use( cm.raiz );
    //.use( error.http404 );

module.exports = app;