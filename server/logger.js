'use strict';

var winston    = require( 'winston' );

var transports = require( './winston/transports' );
var level      = require( './winston/level' );

module.exports = winston.createLogger( {
  transports: transports,
  level:      level
} );
