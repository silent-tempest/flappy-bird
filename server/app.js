'use strict';

var express = require( 'express' );

var app = express()
  .set( 'view engine', 'ejs' )
  .set( 'views', 'server/views' )
  .set( 'trust proxy', true );

if ( process.env.NODE_ENV === 'production' ) {
  app.set( 'view cache', true );
}

module.exports = app;
