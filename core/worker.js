'use strict';

var logger = require( './logger' );
var server = require( './server' );
var app    = require( './app' );

if ( typeof process.env.PORT === 'undefined' ) {
  throw Error( 'The FlappyShape Server was started without a port. "PORT" must be exported before starting the server: "PORT=3000 node ."' );
}

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
  var address;

  if ( process.env.NODE_ENV === 'production' ) {
    address = 'http://flappyshape.herokuapp.com/';
  } else {
    address = 'http://localhost:' + process.env.PORT + '/';
  }

  logger.verbose( '%sth worker is running at "%s"', process.env.WEB_WORKER, address );
} );
