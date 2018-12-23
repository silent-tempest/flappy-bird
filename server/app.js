'use strict';

var express = require( 'express' );

var app = express()
  .set( 'view engine', 'ejs' )
  .set( 'views', 'server/views' )
  .set( 'strict routing', false )
  .set( 'trust proxy', true );

module.exports = app;
