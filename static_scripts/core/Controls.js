'use strict';

var LightEmitter = require( 'light_emitter' );
var extend       = require( 'extend' );

var Controls = extend( LightEmitter, {
  /**
   * @constructor Controls
   * @extends {LightEmitter}
   * @event Controls#touchstart
   * @event Controls#touchend
   * @example
   * var Controls = require( './Controls' );
   * var controls = new Controls();
   *   .on( 'touchstart', function ( event, keyboard )
   *   {
   *     if ( keyboard ) {
   *       console.log( 'this event from a keyboard' );
   *     }
   *
   *     console.log( 'works with keyboard and touchscreens (cross-platform)' );
   *   } );
   */
  constructor: function Controls ()
  {

    console.log( 0 ); // jshint ignore: line
    var self = this;

    this.__super__.apply( this, arguments );

    function touchstart ( event )
    {
      self.emit( 'touchstart', event, ! event.type.indexOf( 'key' ) );
    }

    window.addEventListener( 'touchstart', touchstart );
    window.addEventListener( 'mousedown', touchstart );

    function keydown ( event )
    {
      if ( event.which === 32 ) {
        touchstart( event );
      }
    }

    window.addEventListener( 'keydown', keydown );

    function touchend ( event )
    {
      self.emit( 'touchend', event, ! event.type.indexOf( 'key' ) );
    }

    window.addEventListener( 'touchend', touchend );
    window.addEventListener( 'mouseup', touchend );

    function keyup ( event )
    {
      if ( event.which === 32 ) {
        touchend( event );
      }
    }

    window.addEventListener( 'keyup', keyup );
  }
} );

module.exports = Controls;
