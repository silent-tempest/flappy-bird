'use strict';

var Router = require( 'express' ).Router;

var engine = require( '../../engine' );

module.exports = new Router().get( '/play/new', function ( request, response, next )
{
  if ( ! request.url.indexOf( '/play/new/' ) ) {
    response.redirect( '/play/new' + request.url.slice( '/play/new/'.length ) );
    return;
  }

  try {
    var content = engine.render( 'play/new', {
      head: [
        '<link rel="stylesheet" href="styles/index.css" />'
      ],

      body: [
        '<script src="scripts/index.js"></script>'
      ]
    } );

    response.type( 'html' ).status( 200 ).end( content );
  } catch ( error ) {
    next( error );
  }
} );
