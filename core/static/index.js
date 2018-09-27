'use strict';

var Vector2D = require( 'v6.js/math/Vector2D' );
var random   = require( 'peako/random' );

var renderer = require( './objects/renderer' );
var ticker   = require( './objects/ticker' );
var game     = require( './objects/game' );

var position = new Vector2D( renderer.w * 0.5, renderer.h * 0.5 );

controls.on( 'touchstart', function ( event, keyboard )
{
  if ( keyboard ) {
    console.log( 'pressed on a keyboard' ); // jshint ignore: line
  } else {
    console.log( 'touched on a screen' ); // jshint ignore: line
  }
} );

ticker.on( 'render', function ()
{
  renderer.background( 0 );
  renderer.fill( 255 );
  renderer.stroke( 'lightpink' );
  renderer.lineWidth( 5 );
  renderer.polygon( position.x, position.y, 20, 3 );
} );

ticker.on( 'update', function ( elapsedTime )
{
  var v = 50;
  var x = random( -v, v ) * elapsedTime;
  var y = random( -v, v ) * elapsedTime;
  position.add( x, y );
} );

ticker.start();
