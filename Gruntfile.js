module.exports = function (grunt) {
    const sass = require('sass');

    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
        options: {
            livereload: true,
            spawn: false
        },
        css: {
            files: ['scss/*.scss'],
            tasks: ['sass-task'],
        },
        js: {
            files: ['js/pushy.js'],
            tasks: ['js-task'],
        },
    },
    sass: {
        options: {
            implementation: sass,
            sourceMap: true
        },
        dist: {
            files: {
            'css/pushy.css': 'scss/pushy.scss',
            'css/demo.css': 'scss/demo.scss',
            }
        }
        },
        uglify: {
            dist: {
                files: {
                'js/pushy.min.js': 'js/pushy.js'
                }
            }
        }
    });
  
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');  
    grunt.registerTask('default', ['sass', 'uglify']);
    grunt.registerTask('js-task', ['concat', 'uglify']);
    grunt.registerTask('sass-task', ['sass']);
  };
  