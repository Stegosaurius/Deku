module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      client: {
        src: [
          "client/keys/dashboardConfigure.js",
          "client/app/app.js",
          "client/app/auth/auth.controller.js",
          "client/app/dashboard/dashboard.controller.js",
          "client/app/forum/allThreads.controller.js",
          "client/app/forum/thread.controller.js",
          "client/app/profile/profile.controller.js",
          "client/app/profile/editProfile.controller.js",
          "client/app/navbar/navbar.controller.js",
          "client/app/route-config.js",
          "client/app/services/forum.service.js",
          "client/app/services/user.service.js",
          "client/app/services/keenio.service.js"
        ],
        dest: 'client/dist/client.js'
      },
      dependencies: {
        src: [
          "client/lib/jquery/dist/jquery.min.js",
          "client/lib/angular/angular.min.js",
          "client/lib/angular-ui-router/release/angular-ui-router.min.js",
          "client/lib/angular-jwt/dist/angular-jwt.min.js",
          "client/lib/keen-js/dist/keen.min.js",
          "client/lib/jquery-knob/dist/jquery.knob.min.js",
          "client/lib/Materialize/dist/js/materialize.min.js",
          "client/lib/angular-materialize/src/angular-materialize.js",
          "client/lib/ng-file-upload/ng-file-upload-shim.min.js",
          "client/lib/ng-file-upload/ng-file-upload.min.js"
        ],
        dest: 'client/dist/dependencies.min.js'
      }
    },

    uglify: {
      client: {
        src: [
          'client/dist/client.js'
        ],
        dest: 'client/dist/client.min.js'
      }
    },

    sass: {
      dist: {
        files: {
          'client/styles/styles.css' : 'client/sass/styles.scss'
        }
      }
    },

    watch: {
      css: {
        files: 'client/**/*.scss',
        tasks: ['sass']
      }
    },

    shell: {
      seed: {
        options: {
          stdout: true,
          stderr: true
        },
        command: 'node server/db/seed.js'
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('build', [
    'concat',
    'uglify',
    'sass'
  ]);

  grunt.registerTask('default', [
    'build',
    'nodemon'
  ]);

};
