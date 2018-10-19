'use strict';

var { createLogger } = require( 'winston' );

var transport        = require( './winston/transport' );
var level            = require( './winston/level' );

var logger = createLogger( {
  transports: [
    transport
  ],

  level: level
} );

module.exports = logger;
