'use strict';

module.exports = require( 'helmet' )( {
  // Content-Security-Policy: default-src 'self'
  contentSecurityPolicy: {
    directives: {
      'default-src': [ "'self'" ],
      'script-src':  [ "'self' 'unsafe-eval'" ]
    }
  },
  // X-Frame-Options: DENY
  frameguard: {
    action: 'deny'
  }
} );
