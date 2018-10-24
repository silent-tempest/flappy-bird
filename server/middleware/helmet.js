'use strict';

var helmet = require( 'helmet' );

module.exports = helmet( {
  // Content-Security-Policy: default-src 'self'
  contentSecurityPolicy: {
    directives: {
      'frame-ancestors': [ "'none'" ],
      'default-src':     [ "'self'" ]
    }
  },

  // X-Frame-Options: DENY
  frameguard: {
    action: 'deny'
  }
} );
