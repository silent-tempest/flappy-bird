
/*!
 * Flappy Bird 2
 * Copyright (c) 2018 SILENT
 * Released under the MIT Licence.
 */

/* jshint esversion: 5, unused: true, undef: true */
/* global platform, v6, _ */

;( function ( window, undefined ) {

'use strict';

var
  PIXEL_DENSITY = 0.8,
  touchable = 'ontouchend' in window,
  MODE, safari, Bird, Pipe, game;

safari = platform.os &&
  platform.os.family === 'iOS' &&
  platform.name === 'Safari';

if ( touchable && !safari ) {
  MODE = 'webgl';
} else {
  MODE = '2d';
}

game = {
  changeColor: function changeColor () {
    var
      a = _.random( 240, 270 ),
      b = a + 150,
      c = a + 210,
      bg = v6.hsla( a, 35, 30, 1 );

    this.renderer.canvas.style.background = bg;
    this.ui[ '.theme' ].attr( 'content', bg );
    this.birdColor = v6.hsla( b, 100, 70 );
    this.pipeColor = v6.hsla( c, 90, 80 );
  },

  ui: {
    init: function init () {
      this[ '.theme' ] = _( '.theme' );
    }
  },

  init: function init () {
    this.renderer = v6( {
      settings: {
        scale: PIXEL_DENSITY
      },

      mode: MODE
    } );

    this.bird = new Bird( this );

    this.camera = this.renderer.camera( {
      speed: [
        0.01, // x axis
        0.01, // y axis
        0.01, // zoom in
        0.01  // zoom out
      ],

      scale: [
        1,  // current zoom
        1,  // min zoom
        1.5 // max zoom
      ]
    } );

    this.ui.init();
    this.changeColor();

    v6
      .ticker( this.update, this.draw, this )
      .tick();
  },

  update: function update ( dt ) {
    this.camera
      .lookAt( this.bird.pos )
      .update();
  },

  draw: function draw () {
    this.renderer
      .setTransformFromCamera( this.camera )
      .stroke( this.birdColor );
    this.bird.show();
  }
};

Bird = function ( game ) {
  this.renderer = game.renderer;
  this.pos = v6.vec2();
  this.r = 24;
  this.sides = 5;
  this.angle = 0;
};

Bird.prototype = {
  show: function () {
    this.renderer.polygon( this.pos.x, this.pos.y, this.r, this.sides, this.angle );
  },

  constructor: Bird
};

_( function () {
  game.init();
} );

} )( this );
