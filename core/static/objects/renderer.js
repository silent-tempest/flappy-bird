'use strict';

var createRenderer  = require( 'v6.js/create_renderer' );
var constants       = require( 'v6.js/constants' );

module.exports = createRenderer( { mode: constants.get( 'RENDERER_AUTO' ) } );
