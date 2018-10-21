'use strict';

var platform = require( 'platform' );

var logger   = require( '../logger' );

function loggerMiddleware ( request, response, next )
{
  var userAgent = request.headers[ 'user-agent' ];
  var from;

  if ( userAgent ) {
    from = platform.parse( userAgent );
  } else {
    from = 'unknown user agent';
  }

  logger.verbose( 'A "%s" request to "%s" from %s, an IP address: "%s"', request.method, request.url, from, request.ip );
  next();
}

module.exports = loggerMiddleware;
