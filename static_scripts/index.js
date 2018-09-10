'use strict';

var Renderer  = require( 'v6.js/renderer' );
var Ticker    = require( 'v6.js/Ticker' );
var constants = require( 'v6.js/constants' );

var Bird      = require( './Bird' );

var bird = new Bird();

var renderer = global.renderer = Renderer( {
  mode: constants.MODE_AUTO
} )
  .fill( 255 );

var ticker = new Ticker()
  .on( 'render', function () {
    renderer.backgroundColor( 0 );
    bird.render( renderer );
  } )
  .on( 'update', function () {
    bird.pos.add( 1, 1 );
  } )
  .tick();
