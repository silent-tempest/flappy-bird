
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
  atan2 = Math.atan2,
  min = Math.min,
  max = Math.max,
  PX_DENS = 0.8,
  touchable = 'ontouchend' in window,
  pipes = [],
  MODE, safari, Bird, Pipe, game, bird, world;

safari = platform.os &&
  platform.os.family === 'iOS' &&
  platform.name === 'Safari';

if ( false && touchable && !safari ) {
  MODE = 'webgl';
} else {
  MODE = '2d';
}

world = {
  GRAVITY: v6.vec2( 0, 55 * PX_DENS ),
  MIN_PIPE_HEIGHT: 256 * PX_DENS,
  MAX_PIPE_HEIGHT: 384 * PX_DENS,
  PIPE_OFF: 200 * PX_DENS,
  SPEED: 500 * PX_DENS
};

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
    var stopFly = function stopFly () {
      game.touched = game.jumped = false;
    };

    this.renderer = v6( {
      settings: {
        scale: PX_DENS
      },

      mode: MODE
    } )
      .lineWidth( 1.5 )
      .noFill();

    bird = new Bird();
    pipes.push( new Pipe() );

    this.camera = this.renderer.camera( {
      speed: [
        0.1, // x axis
        0.1, // y axis
        0.01, // zoom in
        0.01  // zoom out
      ],

      zoom: [
        // todo make adapted
        // see main.js from v6-flappy-bird (1st version)
        1,  // current zoom
        1,  // min zoom (zoom out)
        1.5 // max zoom (zoom in)
      ]
    } );

    this.resize();
    this.ui.init();
    this.changeColor();

    v6
      .ticker( this.update, this.draw, this )
      .tick();

    _( window )
      .resize( this.resize )
      .touchstart( this.fly )
      .touchend( stopFly );
  },

  update: function update ( dt ) {
    if ( this.stopped ) {
      this.camera.zoomIn();
    }

    if ( this.addSpeed ) {
      this.pipeSpeed += world.SPEED * 0.02;

      if ( this.pipeSpeed >= world.SPEED ) {
        this.pipeSpeed = world.SPEED;
        this.addSpeed = false;
      }
    } else if ( this.stopped ) {
      this.pipeSpeed = max( 0, this.pipeSpeed - world.SPEED * 0.01 );
    }

    if ( this.zoomOut ) {
      this.camera.zoomOut();
    }

    if ( !this.stopped && ( this.touched && !this.flew || !this.started && bird.pos.y > 0 ) ) {
      this.flew = this.started;
      bird.fly();
    }

    bird.update();

    

    this.camera
      .lookAt( bird.pos )
      .update();
  },

  draw: function draw () {
    this.renderer
      .restore()
      .save()
      .clear()
      .setTransformFromCamera( this.camera )
      .stroke( this.birdColor );

    bird.show();

    this.renderer.stroke( this.pipeColor );

    pipes.forEach( _.invoke( 'show' ) );
  },

  resize: function resize ( e ) {
    if ( e ) {
      game.renderer.resize( true );
    }

    game.camera.offset.set( game.renderer.width * 0.2, game.renderer.height * 0.5 );
  },

  fly: function fly ( e ) {
    if ( e && ( /* ignore( e ) || */ !game.stopped && e.which !== 1 ) ) {
      return;
    }

    game.touched = true;

    if ( !game.started ) {
      game.start();
    }
  },

  COLLISION_STEPS: 0,
  pipeSpeed: 0,
  collision: true,
  addSpeed: false,
  touched: false,
  started: false,
  stopped: true,
  zoomOut: true,
  flew: false
};

Pipe = function Pipe ( x ) {
  var center, spacing;

  if ( x == null ) {
    spacing = world.MIN_PIPE_HEIGHT;
    center = Pipe.lastCenter = 0;
    this.x = world.PIPE_OFF * 2;
  } else {
    spacing = _.random( world.MIN_PIPE_HEIGHT, world.MAX_PIPE_HEIGHT );
    center = Pipe.getCenter();
    this.x = x;
  }

  this.top = center - spacing * 0.5;
  this.bottom = this.top + spacing;
  this.finished = false;
};

Pipe.prototype = {
  show: function show () {
    var
      renderer = game.renderer,    
      cam = game.camera,
      x = this.x,
      w = this.w,
      // hide top and bottom edges
      pad = 5 * PX_DENS,
      diff, y1, h1, y2, h2;

    if ( x > renderer.width / cam.zoom[ 0 ] || x + w < -cam.offset[ 0 ] / cam.zoom[ 0 ] ) {
      return;
    }

    diff = cam.position[ 1 ] - cam.position[ 3 ];
    h1 = this.top - bird.pos.y + cam.offset.y / cam.zoom[ 0 ] + diff + pad;

    if ( h1 > 0 ) {
      y1 = bird.pos.y - cam.offset.y / cam.zoom[ 0 ] - diff - pad;
      renderer.rect( x, y1, w, h1 );
    }

    h2 = renderer.height / cam.zoom[ 0 ] - this.bottom + bird.pos.y - cam.offset.y / cam.zoom[ 0 ] - diff + pad;

    if ( h2 > 0 ) {
      y2 = this.bottom;
      renderer.rect( x, y2, w, h2 );
    }
  },

  constructor: Pipe,
  w: 72 * PX_DENS
};

Pipe.getCenter = function getCenter () {
  return Pipe.lastCenter += _.random( -Pipe.step, Pipe.step );
};

Pipe.lastCenter = 0;
Pipe.step = 300 * PX_DENS;

Bird = function Bird () {
  this.pos = v6.vec2();
  this.sides = 5;
  this.angle = 0;
  this.spd = 0;
};

Bird.prototype = {
  hitsPipe: function hitsPipe ( pipe ) {
    var
      pos = this.pos,
      r = this.r;

    // Bird is far from the pipe
    if ( pos.x + r < pipe.x ||
         pos.x - r > pipe.x + pipe.w ||
         pos.y - r > pipe.top &&
         pos.y + r < pipe.bottom )
    {
      return false;
    }

    // Bird inside the pipe
    if ( pos.x + r >= pipe.x &&
         pos.x - r <= pipe.x + pipe.w &&
       ( pos.y + r < pipe.top ||
         pos.y - r > pipe.bottom ) )
    {
      return true;
    }

    // Bird hits corners
    return this._hitsCorner( pipe.x, pipe.top - r * 2, pipe.w, r * 2 ) ||
           this._hitsCorner( pipe.x, pipe.bottom, pipe.w, r * 2 );
  },

  _hitsCorner: function _hitsCorner ( x2, y2, w2, h2 ) {
    var
      x1 = this.pos.x,
      y1 = this.pos.y,
      r1 = this.r,
      dx = x1 - max( min( x1, x2 + w2 ), x2 ),
      dy = y1 - max( min( y1, y2 + h2 ), y2 );

    return dx * dx + dy * dy <= r1 * r1;
  },

  update: function ( dt ) {
    this.spd = max( this.maxSpd, this.spd - world.GRAVITY );
    this.angle += ( atan2( this.spd, game.pipeSpeed ) - this.angle ) * 0.1;
  },

  fly: function fly () {
    this.spd = max( this.maxSpd, this.spd + this.lift );
  },

  show: function show () {
    game.renderer.polygon( this.pos.x, this.pos.y, this.r, this.sides, this.angle );
  },

  constructor: Bird,
  maxSpd: -1200 * PX_DENS,
  lift: 1750 * PX_DENS,
  r: 18 * PX_DENS
};

_( function () {
  game.init();
} );

} )( this );
