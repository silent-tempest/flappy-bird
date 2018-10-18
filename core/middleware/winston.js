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
    from = platform.parse( userAgent );
  } else {
    from = 'Unknown User Agent';
  }

  logger.verbose( 'A "%s" request to "%s" from %s, an IP address: "%s"', request.method, request.url, from, request.ip );
  next();
}

module.exports = loggerMiddleware;
