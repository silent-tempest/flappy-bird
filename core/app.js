'use strict';

var express = require( 'express' );

var app = express()
  .set( 'view engine', 'ejs' )
  .set( 'views', 'core/views' );

if ( process.env.NODE_ENV === 'production' ) {
  app.set( 'view cache', true );
}

module.exports = app;
