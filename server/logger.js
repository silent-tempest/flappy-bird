'use strict';

var { createLogger } = require( 'winston' );

var transports       = require( './winston/transports' );
var level            = require( './winston/level' );

var logger = createLogger( {
  transports: transports,
  level: level
} );

module.exports = logger;
