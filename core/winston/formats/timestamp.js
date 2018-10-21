'use strict';

var winston = require( 'winston' );

module.exports = winston.format.timestamp( {
  format: 'MM/DD/YYYY hh:mm:ss.SSS A'
} );
