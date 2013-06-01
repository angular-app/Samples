
// base path, that will be used to resolve files and exclude
basePath = '.';

// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  'lib/jquery-1.8.3/jquery-1.8.3.js',
  'lib/jquery-ui-1.9.2/js/datepicker.js',
  'lib/angular/1.0.4/angular.js',
  'lib/angular/1.0.4/angular-mocks.js',
  '1820EN_*/**/*.js'
];

// list of files to exclude
exclude = [
  '1820EN_01_Code/**',
  '1820EN_02_Code/10 - testing - karma tips and tricks/**',
  '1820EN_05_Code/**',
  '1820EN_06_Code/**',
  '1820EN_09_Code/01_directive_test_skeleton/test.js'
];

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari
// - PhantomJS
browsers = ['Chrome'];

// test results reporter to use
// possible values: dots || progress
reporter = 'progress';

// web server port
port = 9018;

// cli runner port
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = true;