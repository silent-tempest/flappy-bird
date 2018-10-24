'use strict';

module.exports = function ( error, request, response, next ) // eslint-disable-line no-unused-vars
{
  response.status( 500 ).render( 'error', {
    status: 500, message: 'Internal Server Error', description: 'An error occurred while processing your request. Try to open this page later.'
  } );
};
