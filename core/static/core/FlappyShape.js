'use strict';

var Vector2D = require( 'v6.js/math/Vector2D' );

/**
 * Класс птички.
 * @constructor FlappyShape
 * @param {number} [x] Начальная позиция птички.
 * @param {number} [y] Начальная позиция птички.
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
   * Отрисовывает птичку на холсте.
   * @method FlappyShape#render
   * @param  {v6.js.AbstractRenderer} renderer
   * @return {void}
   */
  render: function render ( renderer )
  {
    renderer.arc( this.position.x, this.position.y, this.radius * renderer.settings.scale );
  },

  /**
   * @method FlappyShape#update
   * @param  {number} elapsedTime
   * @return {void}
   */
  update: function update ( elapsedTime )
  {
    this.velocity.add( this.acceleration );
    this.position.add( this.velocity.copy().mult( elapsedTime ) );
    this.acceleration.set();
    return this;
  },

  constructor: FlappyShape
};

module.exports = FlappyShape;
