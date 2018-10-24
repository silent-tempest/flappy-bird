'use strict';

var Bodies             = require( 'matter-js/src/factory/Bodies' );

var AbstractMatterBody = require( './AbstractMatterBody' );

/**
 * The Pipe class.
 * @constructor Pipe
 * @extends AbstractMatterBody
 * @param {number} [x] Начальная позиция Pipe.
 * @param {number} [y] Начальная позиция Pipe.
 * @example
 * // Create an Pipe instance.
 * var pipe = new Pipe( 100, 0, 100 );
 */
function Pipe ( x, y, h )
{
  /**
   * Ширина Pipe.
   * @member {number} Pipe#w
   */
  this.w = 100;

  /**
   * Высота Pipe.
   * @member {number} Pipe#h
   */
  this.h = h;

  this.body = Bodies.rectangle( x, y, this.w, this.h );
}

Pipe.prototype = Object.create( AbstractMatterBody.prototype );
Pipe.prototype.constructor = Pipe;

/**
 * Отрисовывает Pipe на холсте.
 * @method Pipe#render
 * @param  {v6.AbstractRenderer} renderer Рендерер.
 * @return {void}                         Ничего не возвращает.
 * @example
 * pipe.render( renderer );
 */
Pipe.prototype.render = function render ( renderer )
{
  renderer.rect( this.body.position.x, this.body.position.y, renderer.settings.scale * this.w, renderer.settings.scale * this.h );
};

/**
 * @interface IPipeData
 * @property {number} x
 * @property {number} y
 * @property {number} h
 */

module.exports = Pipe;
