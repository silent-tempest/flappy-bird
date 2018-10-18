'use strict';

var winston = require( 'winston' );

var format  = require( './format' );

var transport;

if ( process.env.NODE_ENV === 'production' ) {
  transport = new winston.transports.File( {
    filename: 'flappyshape.log',
    format: format,
    eol: '\n'
  } );
} else {
  transport = new winston.transports.Console( {
    format: format
  } );
}

module.exports = transport;
