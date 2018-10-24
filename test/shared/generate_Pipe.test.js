'use strict';

var constants = require( '../../shared/constants' );
var generate  = require( '../../shared/generate_Pipe' );

describe( 'generate_Pipe', function ()
{
  describe( '#1', function ()
  {
    it( 'works', function ()
    {
      var lastPipe = {
        x: 0,
        y: 0,
        h: 0
      };

      var metadata = {
      };

      var data = generate( lastPipe, metadata );

      data.should.be.an( 'object' );
      // data.should.have.property( 'x' ).which.is.a( 'number' ).and.gt( lastPipe.x );
      data.should.have.property( 'y' ).which.is.a( 'number' ).and.closeTo( lastPipe.y, constants.PIPE_DELTA_Y );
    } );
  } );
} );
