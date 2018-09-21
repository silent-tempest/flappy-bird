/*!
 * flappyshape
 * copyright (c) 2018 SILENT
 * released under the GPL-3.0 license.
 */

'use strict';

var Renderer  = require( 'v6.js/renderer' );
var Ticker    = require( 'v6.js/Ticker' );
var constants = require( 'v6.js/constants' );

var game      = require( './game' );

game.init();

var renderer = global.renderer = Renderer( {
  mode: constants.MODE_AUTO
} )
  .fill( 255 );

new Ticker()
  .on( 'render', function ()
  {
    renderer.backgroundColor( 0 );
    game.bird.render( renderer );
  } )
  .on( 'update', function ()
  {
    game.bird.pos.add( 1, 1 );
  } )
  .tick();
