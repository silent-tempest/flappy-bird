'use strict';

var Bird = require( './Bird' );

/**
 * @namespace game
 */
var game = {
  /**
   * @method game.init
   * @return {void}
   */
  init: function init ()
  {
    this.bird = new Bird();
  },

  /**
   * @property {Bird} game.bird
   */
  bird: null
};

module.exports = game;
