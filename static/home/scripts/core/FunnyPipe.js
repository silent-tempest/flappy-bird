'use strict';

var Vector2D = require( 'v6.js/core/math/Vector2D' );

/**
 * The FunnyPipe class.
 * @constructor FunnyPipe
 * @param {number} [x] Начальная позиция FunnyPipe.
 * @param {number} [y] Начальная позиция FunnyPipe.
 * @example
 * // Create an FunnyPipe instance.
 * var funnyPipe = new FunnyPipe( 0, renderer.height / 2 );
 */
function FunnyPipe ( x, y )
{
  /**
   * @member {v6.Vector2D} FunnyPipe#position Позиция.
   */
  this.position = new Vector2D( x, y );

  /**
   * @member {number} FunnyPipe#w Ширина FunnyPipe.
   */
  this.w = 100;

  /**
   * @member {number} FunnyPipe#h Высота FunnyPipe.
   */
  this.h = 200;
}

FunnyPipe.prototype = {
  /**
   * Отрисовывает FunnyPipe на холсте.
   * @method FunnyPipe#render
   * @param  {v6.AbstractRenderer} renderer Рендерер.
   * @return {void}                         Ничего не возвращает.
   * @example
   * funnyPipe.render( renderer );
   */
  render: function render ( renderer )
  {
    renderer.rect( this.position.x, this.position.y, renderer.settings.scale * this.w, renderer.settings.scale * this.h );
  },

  constructor: FunnyPipe
};

module.exports = FunnyPipe;
