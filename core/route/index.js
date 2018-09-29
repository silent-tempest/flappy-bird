'use strict';

module.exports = function ( request, response, next )
{
  response.render( 'index', function ( error, content )
  {
    if ( error ) {
      next( error );
    } else {
      response.send( content );
    }
  } );
};
