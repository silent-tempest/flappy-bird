'use strict';

module.exports = function ( request, response )
{
  response.status( 404 ).render( 'error', {
    status: 404, message: 'Not Found', description: 'The FlappyShape Server cannot find this page.'
  } );
};
