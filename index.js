'use strict';

var cluster = require( 'cluster' );
var os      = require( 'os' );

var logger  = require( './core/logger' );

var concurrency = Number( process.env.WEB_CONCURRENCY ) || os.cpus().length;

if ( cluster.isMaster && concurrency > 1 ) {
  logger.verbose( 'Booting The FlappyShape Server with %s workers', concurrency );

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

  require( './core/worker' );
}
