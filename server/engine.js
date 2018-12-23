'use strict';

var T   = require( 'tmpl' );

var app = require( './app' );

module.exports = new T.ViewEngine( {
  settings: {
    views: app.get( 'views' )
  }
} );
