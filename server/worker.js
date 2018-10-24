'use strict';

var logger = require( './logger' );
var server = require( './server' );
var app    = require( './app' );

app
  .use( require( './middleware/winston' ) )
  .use( require( './middleware/compression' ) )
  .use( require( './middleware/helmet' ) )
  .use( require( './middleware/send_static' ) )
  .use( require( './middleware/parse_body' ) );

if ( process.env.NODE_ENV !== 'production' ) {
  app.use( require( './route/home' ) );
}

app
  .use( require( './route/404' ) )
  .use( require( './route/500' ) );

server.listen( process.env.PORT, function ()
{
  logger.verbose( '"%s" worker is running', process.env.WEB_WORKER );
} );
