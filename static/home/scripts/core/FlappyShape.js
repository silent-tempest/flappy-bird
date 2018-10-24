'use strict';

var Bodies             = require( 'matter-js/src/factory/Bodies' );

var AbstractMatterBody = require( './AbstractMatterBody' );

/**
 * The FlappyShape class.
 * @constructor FlappyShape
 * @extends AbstractMatterBody
 * @param {number} [x] Начальная позиция FlappyShape.
 * @param {number} [y] Начальная позиция FlappyShape.
 * @example
 * // Create an FlappyShape instance.
 * var flappyShape = new FlappyShape( 0, 0 );
 */
function FlappyShape ( x, y )
{
  /**
   * Радиус FlappyShape.
   * @member {number} FlappyShape#radius
   */
  this.radius = 20;

  this.body = Bodies.circle( x, y, this.radius );
}

FlappyShape.prototype = Object.create( AbstractMatterBody.prototype );
FlappyShape.prototype.constructor = FlappyShape;

/**
 * Отрисовывает FlappyShape на холсте.
 * @method FlappyShape#render
 * @param  {v6.AbstractRenderer} renderer Рендерер.
 * @return {void}                         Ничего не возвращает.
 * @example
 * flappyShape.render( renderer );
 */
FlappyShape.prototype.render = function render ( renderer )
{
  renderer.arc( this.body.position.x, this.body.position.y, renderer.settings.scale * this.radius );
};

module.exports = FlappyShape;
