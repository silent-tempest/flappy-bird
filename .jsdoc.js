'use strict';

module.exports = {
  source: {
    exclude: [ 'node_modules', 'docs', 'dist', 'test' ]
  },

  opts: {
    'destination': 'docs',
    'recurse': true
  }
};
