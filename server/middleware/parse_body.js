'use strict';

var Router     = require( 'express/lib/router' );
var bodyParser = require( 'body-parser' );

module.exports = Router()
  .use( bodyParser.urlencoded( { limit: 0, extended: true } ) );
