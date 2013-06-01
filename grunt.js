module.exports = function (grunt) {

  grunt.loadTasks('build');

  grunt.initConfig({
    html2js: {
      src: ['1820EN_*/**/template/**/*.html']
    },
    lint: {
      files:['grunt.js', '1820EN_*/**/*.js']
    }
  });

  // Default task
  grunt.registerTask('default', 'lint html2js test');
  grunt.registerTask('travis', 'lint html2js test-travis');

  // Karma configuration
  function runKarma(command, options) {
    var karmaCmd = process.platform === 'win32' ? 'karma.cmd' : 'karma';
    var args = [command].concat(options);
    var done = grunt.task.current.async();
    var child = grunt.utils.spawn({
      cmd: karmaCmd,
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
    runKarma('start', ['--single-run', '--no-auto-watch', '--log-level=warn']);
  });

  grunt.registerTask('server', 'start karma server', function() {
    runKarma('start', ['--no-single-run', '--no-auto-watch']);
  });

  grunt.registerTask('test-run', 'run tests against continuous karma server', function() {
    runKarma('run', ['--single-run', '--no-auto-watch']);
  });

  grunt.registerTask('test-watch', 'start karma server, watch & execute tests', function() {
    runKarma('start', ['--no-single-run', '--auto-watch']);
  });

  grunt.registerTask('test-travis', 'run tests on travis', function() {
    runKarma('start', ['--single-run', '--no-auto-watch', '--log-level=warn', '--browsers=Firefox']);
  });
};