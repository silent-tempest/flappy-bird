'use strict';

var Vector2D = require( 'v6.js/core/math/Vector2D' );

/**
 * The FlappyShape class.
 * @constructor FlappyShape
 * @param {number} [x] Начальная позиция FlappyShape.
 * @param {number} [y] Начальная позиция FlappyShape.
 * @example
 * // Create an FlappyShape instance.
 * var flappyShape = new FlappyShape( 0, renderer.height / 2 );
 */
function FlappyShape ( x, y )
{
  /**
   * @member {v6.Vector2D} FlappyShape#acceleration Ускорение.
   */
  this.acceleration = new Vector2D();

  /**
   * @member {v6.Vector2D} FlappyShape#velocity Скорость.
   */
  this.velocity = new Vector2D();

  /**
   * @member {v6.Vector2D} FlappyShape#position Позиция.
   */
  this.position = new Vector2D( x, y );

  /**
   * @member {number} FlappyShape#radius Радиус.
   */
  this.radius = 20;
}

FlappyShape.prototype = {
  /**
   * Отрисовывает FlappyShape на холсте.
   * @method FunnyPipe#render
   * @param  {v6.AbstractRenderer} renderer Рендерер.
   * @return {void}                         Ничего не возвращает.
   * @example
   * flappyShape.render( renderer );
   */
  render: function render ( renderer )
  {
    renderer.arc( this.position.x, this.position.y, renderer.settings.scale * this.radius );
  },

  constructor: FlappyShape
};

module.exports = FlappyShape;
