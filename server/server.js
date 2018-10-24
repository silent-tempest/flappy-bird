'use strict';

var { Server } = require( 'http' );
var app        = require( './app' );

module.exports = new Server( app );
