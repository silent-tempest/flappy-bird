'use strict';

var server = require( './core/server' );
var app    = require( './core/app' );

app
  .use( require( './core/middleware/compression' ) )
  .use( require( './core/middleware/helmet' ) )
  .use( require( './core/middleware/send_static' ) )
  .use( require( './core/middleware/parse_body' ) )
  .use( require( './core/route/index' ) )
  .use( require( './core/route/404' ) )
  .use( require( './core/route/500' ) );

server.listen( process.env.PORT, function ()
{
  console.log( ' * The FlappyShape Server started at "http://localhost:' + process.env.PORT + '".' ); // eslint-disable-line no-console
} );
