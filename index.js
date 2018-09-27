'use strict';

var server = require( './core/server' );
var app    = require( './core/app' );

app
  .use( require( './core/middleware/helmet' ) )
  .use( require( './core/middleware/send_static' ) )
  .use( require( './core/middleware/parse_body' ) )
  .use( require( './core/route/404' ) )
  .use( require( './core/route/500' ) );

server.listen( 3000, () =>
{
  console.log( 'http://localhost:3000' );
} );
