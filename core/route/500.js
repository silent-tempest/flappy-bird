'use strict';

module.exports = function ( error, request, response, next ) // jshint ignore: line
{
  response.status( 500 ).render( 'error', { status: 500, message: 'Internal Server Error', description: '' } );
};
