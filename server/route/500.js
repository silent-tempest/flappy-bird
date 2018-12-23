'use strict';

var inspect = require( 'util' ).inspect;

var logger  = require( '../logger' );

module.exports = function ( error, request, response, next ) // eslint-disable-line no-unused-vars
{
  logger.error( `ID: ${request._info.ID}, ${inspect( error )}` );

  response.status( 500 ).render( 'error', {
    status: 500, message: 'Internal Server Error', description: 'An error occurred while processing your request. Try to open this page later.'
  } );
};
