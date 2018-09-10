'use strict';

var Vector2D = require( 'v6.js/math/Vector2D' );

function Bird () {
  this.pos = new Vector2D();
  this.r   = 20;
}

Bird.prototype = {
  render: function render ( renderer ) {
    renderer.polygon( this.pos.x, this.pos.y, this.r, 3 );
  },

  constructor: Bird
};

module.exports = Bird;
