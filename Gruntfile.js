'use strict';

module.exports = function(grunt) {
  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    year: grunt.template.today('yyyy'),
    clean: {
      dist: [
        'dist',
        '*-dist.zip'
      ]
    },
    copy: {
      core: {
        expand: true,
        src: 'js/**',
        dest: 'dist/'
      }
    },
    jshint: {
      options: {
        curly: true,
        globalstrict: true,
        latedef: true,
        node: true,
        noempty: true,
        strict: true,
        unused: true,
        boss: true
      },
      core: {
        options: {
          devel: true,
          jquery: true,
          globals: {
            define: true,
            document: true
          }
        },
        src: 'js/'
      },
      grunt: 'Gruntfile.js'
    },
    jscs: {
      options: {
        config: 'js/.jscsrc'
      },
      core: 'js/',
      grunt: 'Gruntfile.js'
    },
    uglify: {
      core: {
        expand: true,
        src: 'dist/js/**/*.js',
        ext: '.min.js'
      }
    },
    usebanner: {
      options: {
        banner: [
          '/*!',
          ' * <%= pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1) %> v<%= pkg.version %> (<%= pkg.homepage %>)',
          ' * Copyright 2013-<%= year %> <%= pkg.author.name %> (<%= pkg.author.url %>)',
          ' * Licensed under the <%= pkg.license %> license',
          ' */'
        ].join('\n') + '\n'
      },
      dist: 'dist/**'
    },
    compress: {
      dist: {
        options: {
          archive: '<%= compress.dist.dest %>.zip'
        },
        expand: true,
        cwd: 'dist',
        src: '**',
        dest: '<%= pkg.name %>-<%= pkg.version %>-dist'
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });

  grunt.registerTask('default', [
    'clean',
    'jshint',
    'jscs',
    'copy:core',
    'uglify',
    'usebanner'
  ]);

  grunt.registerTask('release-zip', [
    'compress'
  ]);
};
