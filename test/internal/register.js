'use strict';

var chai  = require( 'chai' );
var like  = require( 'chai-like' );

var as    = require( './chai-as' );

global.expect = chai.expect;

chai.should();
chai.use( like );
chai.use( as );

chai.truncateThreshold = 0;
