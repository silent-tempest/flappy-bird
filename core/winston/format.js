'use strict';

var winston = require( 'winston' );

var hasOwnProperty = Object.prototype.hasOwnProperty;

var formats = [
  winston.format.splat(),

  winston.format.timestamp( {
    format: 'MM/DD/YYYY hh:mm:ss.SSS A'
  } ),

  winston.format.align(),

  winston.format.printf( function ( { timestamp, level, message, meta } )
  {
    var result = timestamp + ' [' + level + ']: ' + message;
    var key;

    for ( key in meta ) {
      if ( hasOwnProperty.call( meta, key ) ) {
        try {
          result += ' ' + JSON.stringify( meta, null, 2 );
        } catch ( error ) {
          // "meta" is a circular structure.
        }

        break;
      }
    }

    return result;
  } )
];

if ( process.env.NODE_ENV !== 'production' ) {
  formats.unshift( winston.format.colorize() );
}

module.exports = winston.format.combine.apply( winston.format, formats );
