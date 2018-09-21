'use strict';

var Vector2D = require( 'v6.js/math/Vector2D' );
var random   = require( 'peako/random' );

var Controls = require( './core/Controls' );
var renderer = require( './objects/renderer' );
var ticker   = require( './objects/ticker' );

var position = new Vector2D( renderer.w * 0.5, renderer.h * 0.5 );
var controls = new Controls();
var fill     = 255;

controls.on( 'touchstart', function ()
{
  fill = random( 255 );
  console.log( fill ); // jshint ignore: line
} );

console.log( controls ); // jshint ignore: line

ticker.on( 'render', function ()
{
  renderer.background( 0 );
  renderer.fill( fill );
  renderer.noStroke();
  renderer.polygon( position.x, position.y, 20, 3 );
} );

ticker.on( 'update', function ( elapsedTime )
{
  var v = 50;
  var x = random( -v, v ) * elapsedTime;
  var y = random( -v, v ) * elapsedTime;
  position.add( x, y );
} );

ticker.tick();
