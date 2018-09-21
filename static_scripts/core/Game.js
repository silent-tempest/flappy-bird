'use strict';

var LightEmitter = require( 'light_emitter' );
var extend       = require( 'extend' );

var Controls     = require( './Controls' );
var Shape        = require( './Shape' );

var Game = extend( LightEmitter, {
  /**
   * @constructor Game
   * @extends {LightEmitter}
   */
  constructor: function Game ()
  {
    this.__super__.apply( this, arguments );
    this.controls = new Controls();
    this.shape    = new Shape();
    this.pipes    = [];
  }
} );

module.exports = Game;
