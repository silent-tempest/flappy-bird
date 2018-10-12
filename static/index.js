'use strict';

var Vector2D = require( 'v6.js/core/math/Vector2D' );

var renderer = require( './objects/renderer' );
var ticker   = require( './objects/ticker' );
var game     = require( './objects/game' );

var position = new Vector2D( renderer.w * 0.5, renderer.h * 0.5 );

var state = {
  touched: false
};

game.controls.on( 'touchstart', function ( event, keyboard )
{
  if ( keyboard ) {
    console.log( 'pressed on a keyboard' ); // eslint-disable-line no-console
  } else {
    console.log( 'touched on a screen' ); // eslint-disable-line no-console
  }

  state.touched = true;
} );

ticker.on( 'render', function ()
{
  renderer.backgroundColor( 0 );
  renderer.fill( 255 );
  renderer.stroke( 'lightpink' );
  renderer.lineWidth( 5 );
  renderer.polygon( position.x, position.y, 20, 3 );
} );

ticker.on( 'update', function ( elapsedTime )
{
  if ( state.touched ) {
    state.touched = false;
    position.add( 2 * elapsedTime, 2 * elapsedTime );
  }
} );

ticker.start();

self.addEventListener( 'resize', function ()
{
  renderer.resizeTo( renderer.canvas.parentNode );
} );
