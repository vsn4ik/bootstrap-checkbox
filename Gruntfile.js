'use strict';

module.exports = function(grunt) {
	// Force use of Unix newlines
	grunt.util.linefeed = '\n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			dist: ['dist', 'docs/dist']
		},
		copy: {
			js: {
				src: 'js/**/*',
				dest: 'dist/'
			},
			docs: {
				src: 'dist/**/*',
				dest: 'docs/'
			}
		},
		uglify: {
			minify: {
				src: 'js/<%= pkg.name %>.js',
				dest: 'dist/js/<%= pkg.name %>.min.js'
			}
		},
		usebanner: {
			options: {
				banner: '/*!\n' +
					' * Bootstrap-checkbox v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
					' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
					' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
					' */\n'
			},
			dist: 'dist/*/*'
		}
	});

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt, {
		scope: 'devDependencies'
	});

	grunt.registerTask('default', ['clean', 'copy:js', 'uglify', 'usebanner', 'copy:docs']);
};
