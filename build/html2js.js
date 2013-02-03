module.exports = function (grunt) {

  // HTML-2-JS Templates
  var path = require('path');
  var TPL = 'angular.module("<%= id %>", []).run(["$templateCache", function($templateCache) {\n  $templateCache.put("<%= id %>",\n    "<%= content %>");\n}]);\n';
  var templateModule = "angular.module('templates', [<%= templates %>]);";
  var escapeContent = function(content) {
    return content.replace(/"/g, '\\"').replace(/\r?\n/g, '" +\n    "');
  };
  var normalizePath = function(p) {
    if ( path.sep !== '/' ) {
      p = p.replace(/\\/g, '/');
    }
    return p;
  };

  grunt.registerHelper('html2js', function(files, base, dest, prefix) {
    var templateList = [];
    prefix = prefix || '';
    files.forEach(function(file) {
      var templatePath = normalizePath(path.relative(base || path.dirname(file), file));
      var templateName = prefix + templatePath;
      var destPath = path.resolve(dest || path.dirname(file), templatePath + '.js');
      var template = grunt.template.process(TPL, {
        id: templateName,
        content: escapeContent(grunt.file.read(file))
      });
      templateList.push("'" + templateName + "'");
      grunt.file.write(destPath, template);
    });

    // Only write out a super module if the dest path was provided
    if ( dest ) {
      grunt.file.write(path.resolve(dest,'templates.js'), grunt.template.process(templateModule, {
        templates: templateList.join(', ')
      }));
    }

    return templateList;
  });

  grunt.registerTask('html2js', 'Generate js version of html template.', function() {
    this.requiresConfig('html2js.src');
    var files = grunt.file.expandFiles(grunt.config.process('html2js.src'));
    var base = grunt.config.process('html2js.base');
    var dest = grunt.config.process('html2js.dest');
    var prefix = grunt.config.process('html2js.prefix');
    grunt.helper('html2js', files, base, dest, prefix);
  });
};