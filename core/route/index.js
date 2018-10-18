'use strict';

var Router = require( 'express/lib/router' );

module.exports = Router().get( '/', function ( request, response )
{
  response.render( 'home' );
} );
