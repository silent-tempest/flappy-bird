'use strict';

var LightEmitter = require( 'light_emitter' );

var Controls     = require( './Controls' );

/**
 * @constructor Game
 * @extends {LightEmitter}
 */
function Game ()
{
  LightEmitter.apply( this, arguments );
  this.controls = new Controls();
  this.shapes   = [];
  this.pipes    = [];
}

Game.prototype = Object.create( LightEmitter.prototype );
Game.prototype.constructor = Game;

module.exports = Game;
