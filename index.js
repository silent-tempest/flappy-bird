'use strict';

var cluster = require( 'cluster' );
var os      = require( 'os' );

var logger  = require( './server/logger' );

var concurrency = Number( process.env.WEB_CONCURRENCY ) || os.cpus().length;

if ( cluster.isMaster ) {
  if ( typeof process.env.PORT === 'undefined' ) {
    throw Error( 'The FlappyShape Server was started without a port. "PORT" must be exported before starting the server: "PORT=3000 node ."' );
  }

  var address;

  if ( process.env.NODE_ENV === 'production' ) {
    address = 'http://flappyshape.herokuapp.com/';
  } else {
    address = 'http://localhost:' + process.env.PORT + '/';
  }

  logger.verbose( 'Booting The FlappyShape Server with %s workers at "%s"', concurrency, address );
}

if ( cluster.isMaster && concurrency > 1 ) {
  for ( var i = 0; i < concurrency; ++i ) {
    cluster.fork( { WEB_WORKER: i } );
  }

  cluster.on( 'error', function ( error )
  {
    logger.error( 'An error in cluster occured', error );
  } );
} else {
  if ( typeof process.env.WEB_WORKER === 'undefined' ) {
    process.env.WEB_WORKER = '0';
  }

  require( './server/worker' );
}
