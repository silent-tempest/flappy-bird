'use strict';

var level;

if ( process.env.LOG_LEVEL ) {
  level = process.env.LOG_LEVEL;
} else if ( process.env.NODE_ENV === 'production' ) {
  level = 'verbose';
} else {
  level = 'debug';
}

module.exports = level;
