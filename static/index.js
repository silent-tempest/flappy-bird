'use strict';

var renderer = require( './objects/renderer' );
var ticker   = require( './objects/ticker' );
var game     = require( './objects/game' );

var TOUCHED = false;

game.controls.on( 'touchstart', function ontouchstart ()
{
  TOUCHED = true;
} );

ticker.on( 'update', function onupdate ( elapsedTime )
{
  if ( TOUCHED ) {
    TOUCHED = false;
    game.shapes[ 0 ].position.add( elapsedTime * 50, elapsedTime * 50 );
  }
} );

ticker.on( 'render', function onrender ()
{
  renderer.backgroundColor( 'skyblue' );
  game.render( renderer );
} );

ticker.start();

self.addEventListener( 'resize', function ()
{
  renderer.resizeTo( renderer.canvas.parentNode );
} );

/**
 * @interface IGameObject
 */

/**
 * Отрисовывает объект на холсте.
 * @method IGameObject#render
 * @param  {v6.AbstractRenderer} renderer Рендерер.
 * @return {void}                         Ничего не возвращает.
 */
