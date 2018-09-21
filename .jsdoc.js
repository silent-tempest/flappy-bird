'use strict';

module.exports = {
  source: {
    exclude: [ 'node_modules', 'docs', 'dist', 'test', '.temp', '.jsdoc.js' ]
  },

  opts: {
    "destination": "docs",
    "recurse": true
  }
};
