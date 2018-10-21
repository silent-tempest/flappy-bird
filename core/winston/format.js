'use strict';

var winston = require( 'winston' );

module.exports = winston.format.combine(
  require( './formats/colorize' ),
  require( './formats/splat' ),
  require( './formats/timestamp' ),
  require( './formats/prinrf' ) );
