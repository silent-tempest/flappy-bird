'use strict';

var platform = require( 'platform' );

var ID = 0;

module.exports = function ( request, response, next )
{
  request._info = {
    Worker: process.env.WEB_WORKER,
    IP:     request.ip,
    UA:     request.headers[ 'user-agent' ] && platform.parse( request.headers[ 'user-agent' ] ) + '',
    Method: request.method,
    URL:    request.url,
    ID:     ++ID
  };

  next();
};
