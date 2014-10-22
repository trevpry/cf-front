'use strict';

angular.module('cfFront', ['ui.router', 'mediaPlayer', 'ngAnimate', 'ui.bootstrap']);

angular.module('cfFront').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partials/partial-home.html'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
        })

        .state('composer-index', {
            url: '/composers',
            templateUrl: 'partials/composer/composer-index.html'
        })

        .state('composer-index.add-composer-form', {
            templateUrl: 'partials/composer/add-composer-form.html'
        })

        .state('composer-details', {
            url: '/composers/{composerID}',
            templateUrl: 'partials/composer/composer-detail.html'
        })

        .state('composer-details.edit-composer-form', {
            templateUrl: 'partials/composer/edit-composer-form.html'
        })

        .state('work-index', {
            url: '/works',
            templateUrl: 'partials/work/work-index.html'
        })

        .state('work-index.add-work-form', {
            templateUrl: 'partials/work/add-work-form.html'
        })

        .state('work-details', {
            url: '/work/{workID}',
            templateUrl: 'partials/work/work-detail.html'
        })

        .state('work-details.edit-work-form', {
            templateUrl: 'partials/work/edit-work-form.html'
        })

        .state('album-index', {
            url: '/albums',
            templateUrl: 'partials/album/album-index.html'
        })

        .state('album-index.add-album-form', {
            templateUrl: 'partials/album/add-album-form.html'
        })

        .state('album-details', {
            url: '/album/{albumID}',
            templateUrl: 'partials/album/album-detail.html'
        })

        .state('album-details.edit-album-form', {
            templateUrl: 'partials/album/edit-album-form.html'
        })

        .state('artist-index', {
            url: '/artist',
            templateUrl: 'partials/artist/artist-index.html'
        })

        .state('track-index', {
            url: '/tracks',
            templateUrl: 'partials/partial-track-index.html'
        })

        .state('temp-track-index', {
            url: '/temp-tracks',
            templateUrl: 'partials/partial-home.html'
        })



    ;

});

angular.module('cfFront').run(function($rootScope, $httpBackend) {

    $rootScope.audio1 = "tracks/TR0000000005.mp3";


});
