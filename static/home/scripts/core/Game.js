'use strict';

var LightEmitter = require( 'light_emitter' );

var Camera       = require( 'v6.js/core/camera/Camera' );

var Controls     = require( './Controls' );
var FlappyShape  = require( './FlappyShape' );
var FunnyPipe    = require( './FunnyPipe' );

/**
 * @constructor Game
 * @extends {LightEmitter}
 */
function Game ()
{
  LightEmitter.apply( this, arguments );

  this.controls = new Controls();

  this.shapes = [
    new FlappyShape( 0, 0 )
  ];

  this.pipes = [
    new FunnyPipe( 0, 0 )
  ];

  this.camera = new Camera( {
    settings: {
      'speed': {
        x: 0.1,
        y: 0.1
      }
    }
  } );
}

Game.prototype = Object.create( LightEmitter.prototype );
Game.prototype.constructor = Game;

Game.prototype.render = function render ( renderer )
{
  var i;

  this.camera.apply( renderer );

  renderer.fill( 'lime' );

  for ( i = this.pipes.length - 1; i >= 0; --i ) {
    this.pipes[ i ].render( renderer );
  }

  renderer.fill( 'orange' );

  for ( i = this.shapes.length - 1; i >= 0; --i ) {
    this.shapes[ i ].render( renderer );
  }
};

module.exports = Game;
