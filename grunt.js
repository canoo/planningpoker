module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },

        requirejs: {
            compile: {
                options: {
                    // main file to start to look for its dependencies.
                    name: 'app',
                    baseUrl: "src/app",
                    mainConfigFile: "src/config.js",
                    optimize: "uglify",
                    out: "build/<%= pkg.bundle %>.min.js"
                }
            }
        },

        buster: {
            test: {
                config: 'test/buster.js',
                reporter: 'xml',
                'log-level': 'debug'
            },
            server: {
                port: 1111
            }
        },

        handlebars: {
            compile: {
                options: {
                    // the namespace within TemplateManager
                    namespace: "JST",
                    processName: function(filename) {
//                        remove the 'src' prefix for the app
                        return filename.split('/').slice(1).join('/');
                    }
                },
                files: {
                    "src/<%= pkg.bundle %>.jst.min.js": [
                        "src/app/templates/**/*.html"
                    ]
                }
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true
            },
            globals: {
                exports: true,
                zepto: true,
                $: true,
                _: true
            }
        },

        compass: {
            dev: {
                src: 'src/resources/sass',
                dest: 'src/resources/css',
                outputstyle: 'expanded',
                relativeassets: true,
                linecomments: true,
//                debugsass: true,
                images: 'src/resources/images',
                fonts: 'src/resources/fonts'
            },
            prod: {
                src: 'src/resources/sass',
                dest: 'build/resources/css',
                outputstyle: 'compressed',
                linecomments: false,
                debugsass: false,
                forcecompile: false,
                relativeassets: true,
                images: 'src/resources/images',
                fonts: 'src/resources/fonts'
            }
        },

        watch: {
            compass: {
                files: ['src/resources/sass/**/*.scss'],
                tasks: ['compass:dev']
            },
            handlebars: {
                files: [
                    'src/app/templates/**/*.html'
                ],
                tasks: 'handlebars'
            }
        },

        clean: {
            build: [
                'build/**'
            ]
        },

        copy: {
            build: {
                files: {
                    "build/": [
                        "src/scripts/requirejs/require.js",
                        "src/config.js",
                        "src/index.html",

                        "src/resources/**/*.css",
                        "src/resources/**/*.png",
                        "src/resources/**/*.jpg"
                    ]
                }
            },
            dist: {
                files: {
                }
            }
        }
    });

//    grunt.loadNpmTasks('grunt-buster');
    grunt.loadNpmTasks('grunt-compass');
    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    // Default task.
    grunt.registerTask('default', 'clean compass handlebars requirejs copy');
    grunt.registerTask('dist', 'clean compass:prod handlebars requirejs copy');
    grunt.registerTask('build', 'clean compass handlebars requirejs copy');
};
