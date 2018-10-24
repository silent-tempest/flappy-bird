'use strict';

var winston = require( 'winston' );

var format  = require( './format' );

module.exports = [
  new winston.transports.Console( {
    format: format
  } )
];
