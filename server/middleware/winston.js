'use strict';

var platform = require( 'platform' );

var logger   = require( '../logger' );

function loggerMiddleware ( request, response, next )
{
  var Worker = process.env.WEB_WORKER;
  var IP     = request.ip;
  var UA     = request.headers[ 'user-agent' ] && platform.parse( request.headers[ 'user-agent' ] ) + '';
  var Method = request.method;
  var URL    = request.url;
  logger.verbose( `Worker: "${Worker}", IP: "${IP}", UA: "${UA}", Method: "${Method}", URL: "${URL}"` );
  next();
}

module.exports = loggerMiddleware;
