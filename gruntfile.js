'use strict';
module.exports = function (grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // watch for changes and trigger sass, jshint, uglify and livereload

        watch: {

            sass: {
                options: {
                    livereload: true,
                },
                files: ['sass/**/*.{scss,sass}'],
                tasks: ['sass', 'autoprefixer', 'cssmin']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint', 'uglify']
            },
            images: {
                files: ['images/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            }
        },

        // sass
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    require: 'susy'
                },
                files: {
                    'sass/build/style.css': 'sass/style.scss',
                    'sass/build/content-sidebar.css': 'sass/content-sidebar.scss',
                    'sass/build/tribe-events.css': 'sass/tribe-events.scss'

                }
            }
        },

        // autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ios 6', 'android 4'],
                map: true
            },
            files: {
                expand: true,
                flatten: true,
                src: 'sass/build/*.css',
                dest: 'sass/build'
            },
        },

        // css minify
        cssmin: {
            options: {
                keepSpecialComments: 1,
                sourceMap: true
            },
            minify: {
                expand: true,
                cwd: 'sass/build',
                src: ['*.css', '!*.min.css', '!content-sidebar.css', '!tribe-events.css'],
                ext: '.css'
            },
            optionallayouts: {
                expand: true,
                cwd: 'sass/build',
                src: ['content-sidebar.css'],
                dest: 'layouts',
                ext: '.css'
            },
            tribeevents: {
                expand: true,
                cwd: 'sass/build',
                src: ['tribe-events.css'],
                dest: 'tribe-events',
                ext: '.css'
            }
        },

        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                'js/src/**/*.js'
            ]
        },

        // uglify to concat, minify, and make source maps
        uglify: {
            plugins: {
                options: {
                    sourceMap: 'js/src/plugins.js.map',
                    sourceMappingURL: 'plugins.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'js/dist/plugins.min.js': [
                        'js/src/plugins.js'
                    ]
                }
            },
            main: {
                options: {
                    sourceMap: 'js/src/main.js.map',
                    sourceMappingURL: 'main.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'js/dist/main.min.js': [ 'js/src/main.js' ],
                }
            }
        },

        // image optimization
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true,
                    interlaced: true
                },
                files: [{
                    expand: true,
                    cwd: 'images/src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        },


    });

    // rename tasks
    // register task
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'uglify', 'imagemin', 'watch']);

};