'use strict';

var Composite = require( 'matter-js/src/body/Composite' );
var Engine    = require( 'matter-js/src/core/Engine' );

var renderer  = require( './objects/renderer' );
var ticker    = require( './objects/ticker' );
var engine    = require( './objects/engine' );
var game      = require( './objects/game' );

var TOUCHENDED = true;
var TOUCHED    = false;

[].concat( game.shapes, game.pipes ).forEach( function ( object )
{
  Composite.add( engine.world, object.body );
} );

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
    // game.shapes[ 0 ].position.add( elapsedTime * 500, elapsedTime * 500 );
  }

  Engine.update( engine, 1000 * elapsedTime );
  game.camera.update();
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
