module.exports = function (grunt) {

  grunt.loadTasks('build');

  grunt.initConfig({
    html2js: {
      src: ['1820EN_*/**/template/**/*.html']
    },
    lint:{
      files:['grunt.js', '1820EN_*/**/*.js']
    }
  });

  // Default task
  grunt.registerTask('default', 'lint test');

  // Testacular configuration
  function runTestacular(command, options) {
    var testacularCmd = process.platform === 'win32' ? 'testacular.cmd' : 'testacular';
    var args = [command].concat(options);
    var done = grunt.task.current.async();
    var child = grunt.utils.spawn({
      cmd: testacularCmd,
      args: args
    }, function(err, result, code) {
      if (code) {
        done(false);
      } else {
        done();
      }
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  }

  grunt.registerTask('test', 'run tests on single-run server', function() {
    runTestacular('start', ['--single-run', '--no-auto-watch', '--log-level=warn']);
  });

  grunt.registerTask('server', 'start testacular server', function() {
    runTestacular('start', ['--no-single-run', '--no-auto-watch']);
  });

  grunt.registerTask('test-run', 'run tests against continuous testacular server', function() {
    runTestacular('run', ['--single-run', '--no-auto-watch']);
  });

  grunt.registerTask('test-watch', 'start testacular server, watch & execute tests', function() {
    runTestacular('start', ['--no-single-run', '--auto-watch']);
  });
};