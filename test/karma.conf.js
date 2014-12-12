'use strict';

module.exports = function(config) {

  config.set({
    basePath : '..', //!\\ Ignored through gulp-karma //!\\

    files : [ //!\\ Ignored through gulp-karma //!\\
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular/angular-route.js',
        'app/bower_components/angular-bootstrap/ui-bootstrap.js',
        'app/bower_components/angular-animate/angular-animate.js',
        'app/bower_components/angular-media-player/dist/angular-media-player.js',
        'app/bower_components/angular-mocks/angular-mocks.js',
        'app/bower_components/ui-router/**/*.js',
        'app/scripts/**/*.js',
        'test/unit/**/*.js',
        'app/scripts/cfFront.js',
        'app/scripts/mergesService.js'
    ],

    autoWatch : false,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
        'karma-phantomjs-launcher',
        'karma-jasmine'
    ]
  });

};
