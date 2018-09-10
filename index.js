'use strict';

let TemplateEngine = require( 'template_engine/lib/TemplateEngine' );
let Router         = require( 'router/lib/Router' );
let { ReadStream } = require( 'fs' );
let { Server }     = require( 'http' );

let engine = new TemplateEngine();

let router = new Router()
  .set( 'view engine', engine )
  .use( require( 'router.body_parser' )( {
    extensions: {
      URLENCODED: 0
    }
  } ) )
  .use( require( 'router.send_static' )( 'static' ) );

let server = new Server( router.handle.bind( router ) ).listen( 3000, () => {
  console.log( 'http://localhost:3000' );
} );

if ( process.env.NODE_ENV === 'production' ) {
  router.set( 'view cache', true );
}

router.get( '/', ( request, response ) => {
  new ReadStream( './static/index.html' ).pipe( response.status( 200 ).type( 'html' ) );
} );

router.get( '/console', ( request, response ) => {

} );

router.use( ( request, response ) => {
  response.status( 404 ).end();
} );
