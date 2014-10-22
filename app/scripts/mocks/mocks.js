angular.module('cfFront').run(function($rootScope, $httpBackend) {
    var tracks = [
        {title: 'Fidelio - Disc 2 Track 1', id: 'TR0000000005', path: 'https://s3.amazonaws.com/users_audio/Disc+2+-+Track++01.MP3'},
        {title: 'The Marriage of Figaro - Disc 2 Track 2', id: 'TR0000000005', path: 'https://s3.amazonaws.com/users_audio/Disc+2+-+Track++02.MP3'},
        {title: 'The Marriage of Figaro - Disc 2 Track 3', id: 'TR0000000006', path: 'https://s3.amazonaws.com/users_audio/Disc+2+-+Track++03.MP3'}
    ];

    var composers = [
        {first_name: "Ludwig", middle_name: "van", last_name: "Beethoven", id: 1},
        {first_name: "Wolfgang", middle_name: "Amadeus", last_name: "Mozart", id: 2}
    ];

    var composer_tracks = [
        [{title: 'Fidelio - Disc 2 Track 1', id: 'TR0000000005', path: 'https://s3.amazonaws.com/users_audio/Disc+2+-+Track++01.MP3'}],
        [
            {title: 'The Marriage of Figaro - Disc 2 Track 2', id: 'TR0000000005', path: 'https://s3.amazonaws.com/users_audio/Disc+2+-+Track++02.MP3'},
            {title: 'The Marriage of Figaro - Disc 2 Track 3', id: 'TR0000000006', path: 'https://s3.amazonaws.com/users_audio/Disc+2+-+Track++03.MP3'}
        ]
    ];

    var works = [
        {work_title: "Fidelio", id: 1},
        {work_title: "The Marriage of Figaro", id: 2}
    ];

    var work_tracks = [
        [{title: 'Fidelio - Disc 2 Track 1', id: 'TR0000000005', path: 'https://s3.amazonaws.com/users_audio/Disc+2+-+Track++01.MP3'}],
        [
            {title: 'The Marriage of Figaro - Disc 2 Track 2', id: 'TR0000000005', path: 'https://s3.amazonaws.com/users_audio/Disc+2+-+Track++02.MP3'},
            {title: 'The Marriage of Figaro - Disc 2 Track 3', id: 'TR0000000006', path: 'https://s3.amazonaws.com/users_audio/Disc+2+-+Track++03.MP3'}
        ]
    ];

    var composer_1 = {first_name: "Ludwig", middle_name: "van", last_name: "Beethoven", id: 1};
    var composer_2 = {first_name: "Wolfgang", middle_name: "Amadeus", last_name: "Mozart", id: 2};

    $httpBackend.whenGET(/\.html$/).passThrough();

    $httpBackend.whenGET('/tracks').respond(function(method,url,data) {
        console.log("Getting tracks");
        return [200, tracks, {}];
    });

    $httpBackend.whenGET('/composers').respond(function(method,url,data) {
        console.log("Getting composers");
        return [200, composers, {}];
    });

    $httpBackend.whenGET('/composer/1/tracks').respond(function(method,url,data) {
        console.log("Getting composer 1");
        return [200, composer_tracks[0], {}];
    });

    $httpBackend.whenGET('/composer/2/tracks').respond(function(method,url,data) {
        console.log("Getting composer 2");
        return [200, composer_tracks[1], {}];
    });

    $httpBackend.whenGET('/works').respond(function(method,url,data) {
        console.log("Getting works");
        return [200, works, {}];
    });

    $httpBackend.whenGET('/work/1/tracks').respond(function(method,url,data) {
        console.log("Getting work 1");
        return [200, work_tracks[0], {}];
    });

    $httpBackend.whenGET('/work/2/tracks').respond(function(method,url,data) {
        console.log("Getting work 2");
        return [200, work_tracks[1], {}];
    });

    $httpBackend.whenGET('/composer/1').respond(function(method,url,data) {
        console.log("Getting composer 1");
        return [200, composer_1, {}];
    });

    $httpBackend.whenGET('/composer/2').respond(function(method,url,data) {
        console.log("Getting composer 2");
        return [200, composer_2, {}];
    });
});