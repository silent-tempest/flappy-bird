'use strict';

module.exports = {
  source: {
    exclude: [ 'node_modules', 'docs', 'dist', 'test', 'temp', 'coverage' ],
    include: [ '.' ]
  },

  opts: {
    destination: 'docs',
    recurse: true,
    private: true
  }
};
