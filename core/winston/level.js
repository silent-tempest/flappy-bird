'use strict';

var level;

if ( process.env.NODE_LOG_LEVEL ) {
  level = process.env.NODE_LOG_LEVEL;
} else if ( process.env.NODE_ENV === 'production' ) {
  level = 'verbose';
} else {
  level = 'debug';
}

module.exports = level;
