/*!
 * Bootstrap-checkbox's Gruntfile
 * http://vsn4ik.github.io/bootstrap-checkbox
 * Copyright 2014-2015 Vasily A. (https://github.com/vsn4ik)
 * Licensed under MIT (https://github.com/vsn4ik/bootstrap-checkbox/blob/master/LICENSE)
 */

'use strict';

module.exports = function(grunt) {
  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: [
        'dist',
        '*-dist.zip'
      ],
      docs: '_gh_pages/*'
    },
    copy: {
      core: {
        expand: true,
        src: 'js/**',
        dest: 'dist/'
      },
      docs: {
        expand: true,
        cwd: 'docs',
        src: '**',
        dest: '_gh_pages',
        options: {
          process: function(content) {
            return grunt.template.process(content, grunt.config);
          },
          noProcess: '**/*.{css,js}'
        }
      },
      assets: {
        files: [{
          expand: true,
          src: 'dist/**',
          dest: '_gh_pages/'
        }, {
          expand: true,
          cwd: 'node_modules/bootstrap/dist',
          src: '**',
          dest: '_gh_pages/vendor/bootstrap'
        }, {
          expand: true,
          cwd: 'node_modules/highlight.js/styles',
          src: '*',
          dest: '_gh_pages/vendor/highlight.js/css'
        }, {
          expand: true,
          cwd: 'node_modules/jquery/dist',
          src: '*.{js,map}',
          dest: '_gh_pages/vendor/jquery/js'
        }, {
          expand: true,
          cwd: 'node_modules/octicons/octicons',
          src: '*.{css,eot,svg,ttf,woff}',
          dest: '_gh_pages/vendor/octicons/css'
        }]
      }
    },
    jshint: {
      options: {
        curly: true,
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
      grunt: {
        options: {
          globalstrict: true
        },
        src: 'Gruntfile.js'
      },
      docs: {
        options: {
          globals: {
            hljs: true
          },
          jquery: true
        },
        src: 'docs/assets/js/'
      }
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
          ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %> (<%= pkg.author.url %>)',
          ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)',
          ' */'
        ].join('\n') + '\n'
      },
      dist: 'dist/**'
    },
    symlink: {
      docs: {
        options: {
          overwrite: true
        },
        src: 'dist',
        dest: '_gh_pages/dist'
      }
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
    'copy:core',
    'uglify',
    'usebanner'
  ]);

  grunt.registerTask('prep-release', [
    'default',
    'copy:docs',
    'copy:assets',
    'compress'
  ]);
};
