'use strict';

var LightEmitter = require( 'light_emitter' );

/**
 * The Controls class.
 * @constructor Controls
 * @extends {LightEmitter}
 * @fires touchstart
 * @fires touchend
 * @example
 * var contorls = new Controls();
 * @example
 * controls.on( 'touchstart', function ( event, fromKeyboard )
 * {
 *   if ( fromKeyboard ) {
 *     console.log( 'A user pressed on spacebar.' );
 *   } else {
 *     console.log( 'A user touched a screen.' );
 *   }
 * } );
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
      touchstart( event, true );
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
      touchend( event, true );
    }
  }

  window.addEventListener( 'keyup', keyup );
}

Controls.prototype = Object.create( LightEmitter.prototype );
Controls.prototype.constructor = Controls;

module.exports = Controls;
