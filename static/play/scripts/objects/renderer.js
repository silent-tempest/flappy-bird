'use strict';

var createRenderer  = require( 'v6.js/core/renderer/create_renderer' );
var constants       = require( 'v6.js/core/constants' );

module.exports = createRenderer( {
  type: constants.get( 'AUTO' )
} ).noStroke();
