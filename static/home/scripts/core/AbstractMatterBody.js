'use strict';

/**
 * @constructor AbstractMatterBody
 */
function AbstractMatterBody ()
{
  /**
   * Matter Body.
   * @member {Matter.Body} AbstractMatterBody#body
   */

  throw Error( 'Cannot create an instance of the abstract class (new AbstractMatterBody)' );
}

/**
 * X координата AbstractMatterBody.
 * @member {number} AbstractMatterBody#x
 */
Object.defineProperty( AbstractMatterBody.prototype, 'x', {
  get: function get ()
  {
    return this.body.position.x;
  }
} );

/**
 * Y координата AbstractMatterBody.
 * @member {number} AbstractMatterBody#y
 */
Object.defineProperty( AbstractMatterBody.prototype, 'y', {
  get: function get ()
  {
    return this.body.position.y;
  }
} );

/**
 * Отрисовывает объект на холсте.
 * @method AbstractMatterBody#render
 * @param  {v6.AbstractRenderer} renderer Рендерер.
 * @return {void}                         Ничего не возвращает.
 * @example
 * flappyShape.render( renderer );
 */

module.exports = AbstractMatterBody;
