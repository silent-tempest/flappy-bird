'use strict';

var winston = require( 'winston' );

module.exports = winston.format.printf( function ( info )
{
  var offset = '';

  var max = Math.max.apply( Math, Object.keys( winston.config.npm.levels ).map( function ( level )
  {
    return level.length;
  } ) );

  var i;

  for ( i = max - info[ Symbol.for( 'level' ) ].length; i > 0; --i ) {
    offset += ' ';
  }

  return `${info.timestamp} [${info.level}]: ${offset}${info.message}`;
} );
