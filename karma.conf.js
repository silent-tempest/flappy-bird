'use strict';

/**
 * @private
 * @method setup
 * @param  {object} config
 * @return {void}
 */
function setup ( config )
{
  config.set( {
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'browserify', 'mocha' ],

    // list of files / patterns to load in the browser
    files: [
      { pattern: 'test/internal/register.js', included: true }, // Initialize.
      { pattern: 'static/**/*.js',            included: true }, // Sources.
      { pattern: 'test/**/*.test.js',         included: true }, // Tests.
      { pattern: 'test/**/*.test.karma.js',   included: true }  // Tests.
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'static/**/*.js': [ 'browserify' ], // Sources.
      'test/**/*.js':   [ 'browserify' ]  // Tests.
    },

    browserify: {
      transform: [
        'browserify-istanbul'
      ],

      debug: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [ 'mocha', 'coverage' ],

    // mocha-reporter config
    mochaReporter: {
      // Shows a diff output.
      showDiff: 'unified'
    },

    // karma-coverage config
    coverageReporter: {
      reporters: [
        { type: 'lcovonly',     subdir: '.', file: 'lcov.info' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
        { type: 'text',         subdir: '.', file: 'text.txt' },
        { type: 'html' }
      ]
    },

    // plugins to use
    plugins: [
      'karma-firefox-launcher',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
      'karma-browserify',
      'karma-coverage',
      'karma-mocha'
    ],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [ 'Chrome', 'Chromium', 'Firefox', 'FirefoxDeveloper' ],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Number of browsers to run at the same time.
    concurrency: 1
  } );
}

module.exports = setup;
