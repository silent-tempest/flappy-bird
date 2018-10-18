'use strict';

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
  logger.verbose( 'A "%s" request to "%s"', request.method, request.url );
  next();
}

module.exports = loggerMiddleware;
