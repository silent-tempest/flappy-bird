'use strict';

var LightEmitter = require( 'light_emitter' );

/**
 * @constructor Controls
 * @extends {LightEmitter}
 * @event Controls#touchstart
 * @event Controls#touchend
 */
function Controls ()
{

  var self = this;

  LightEmitter.apply( this, arguments );

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

LightEmitter.prototype = Object.create( LightEmitter.prototype );
LightEmitter.prototype.constructor = LightEmitter;

module.exports = Controls;
