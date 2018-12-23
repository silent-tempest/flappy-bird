'use strict';

module.exports = function ( request, response, next )
{
  response.setHeader( 'X-UA-Compatible', 'IE=edge' );
  next();
};
