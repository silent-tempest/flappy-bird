'use strict';

var io     = require( 'socket.io' );
var Router = require( 'express/lib/router' );

var server = require( '../server' );

var router = Router().get( '/', function ( request, response )
{
  response.render( 'home' );
} );

var socket = io( server, {
  path: '/socket/home/'
} );

socket.on( 'connection', function ( client )
{
  client.on( 'position', function ( /* position */ )
  {
    // Received a FlappyShape position.
    // console.log( position );
  } );
} );

module.exports = router;
