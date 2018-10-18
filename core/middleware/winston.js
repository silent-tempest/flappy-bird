'use strict';

var platform  = require( 'platform' );
var winston   = require( 'winston' );

var transport = require( '../winston/transport' );
var level     = require( '../winston/level' );

var logger = winston.createLogger( {
  level: level,

  transports: [
    transport
  ]
} );

function loggerMiddleware ( request, response, next )
{
  var userAgent = request.headers[ 'user-agent' ];
  var from;

  if ( userAgent ) {
    from = platform.parse( request.headers[ 'user-agent' ] );
  } else {
    from = '<NoUserAgent>';
  }

  logger.verbose( 'A "%s" request to "%s" from %s, an IP address: "%s"', request.method, request.url, from, request.connection.remoteAddress );
  logger.verbose( 'A request\'s "X-Forwarded-For" header: %s', request.headers[ 'x-forwarded-for' ] );
  next();
}

module.exports = loggerMiddleware;
