const path = require('path');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: ['build/**/*']
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*', '!**/*.js'],
            dest: 'build/'
          },
          {
            expand: true,
            cwd: 'src/assets/common/ionic/',
            src: ['**/*'],
            dest: 'build/assets/common/ionic/'
          },
        ]
      }
    },
    browserify: {
      dist: {
        files: {
          'build/bundle.js': ['src/app/app_module.js']
        },
        options: {
          transform: [
            ['babelify', { presets: ['@babel/preset-env'] }]
          ],
          browserifyOptions: {
            debug: true
          },
          alias: {
            'app_module': './src/app/app_module.js'
          }
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false, // Angular 의존성 주입을 위해 변수명 유지
        sourceMap: true,
        sourceMapIncludeSources: true
      },
      build: {
        src: 'build/bundle.js',
        dest: 'build/bundle.min.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'build',
          livereload: true,
          open: true,
          middleware: function(connect, options, middlewares) {
            middlewares.unshift(function(req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', '*');
              res.setHeader('Access-Control-Allow-Headers', '*');
              next();
            });
            return middlewares;
          }
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.css'],
        tasks: ['generate-requires', 'browserify', 'uglify', 'copy'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  // Load required Grunt tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  // auto_require.js 생성 태스크
  grunt.registerTask('generate-requires', function() {
    require('child_process').execSync('node generate-requires.js');
  });

  // Default task(s).
  grunt.registerTask('default', ['generate-requires', 'clean', 'copy', 'browserify', 'uglify']);
  grunt.registerTask('build', ['default']);
  grunt.registerTask('dev', ['default', 'connect', 'watch']);
}; 