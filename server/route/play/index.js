'use strict';

var io     = require( 'socket.io' );
var Router = require( 'express' ).Router;

var server = require( '../../server' );

var router = new Router().get( '/play', function ( request, response )
{
  response.render( 'play.ejs' );
} );

var socket = io( server, {
  path: '/socket/play'
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
