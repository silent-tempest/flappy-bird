'use strict';

var renderer = require( './objects/renderer' );
var ticker   = require( './objects/ticker' );
var game     = require( './objects/game' );

var TOUCHENDED = true;
var TOUCHED    = false;

game.controls.on( 'touchstart', function ontouchstart ( event, fromKeyboard )
{
  if ( ! fromKeyboard || TOUCHENDED ) {
    TOUCHENDED = false;
    TOUCHED    = true;
  }
} );

game.controls.on( 'touchend', function ontouchend ( event, fromKeyboard )
{
  if ( fromKeyboard ) {
    TOUCHENDED = true;
  }
} );

ticker.on( 'update', function onupdate ( elapsedTime )
{
  if ( TOUCHED ) {
    TOUCHED = false;
    game.shapes[ 0 ].position.add( elapsedTime * 500, elapsedTime * 500 );
  }
} );

ticker.on( 'render', function onrender ()
{
  renderer.backgroundColor( 'skyblue' );
  game.render( renderer );
} );

ticker.start();

self.addEventListener( 'resize', function onresize ()
{
  renderer.resizeTo( renderer.canvas.parentNode );
} );
