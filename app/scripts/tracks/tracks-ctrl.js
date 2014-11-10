'use strict';

angular.module('cfFront')
    .controller('tracksCtrl', function($scope, $http, apiService, nameService, playlistService){
        $scope.concatName = nameService.concatName;
        $scope.form = {};
        setRoot();

        this.initialize = function( tracks ){
            console.log(tracks);
            $scope.tracks = tracks;
        };

        if ($scope.tracks === undefined) {
            apiService.getAll()
                .success(function(data, status) {
                    $scope.tracks = data.tracks;
                    console.log("all tracks:" + data);
                });
        }

        $scope.playAll = function(){
           var randomTracks = $scope.tracks.sort(function(){
               return 0.5 - Math.random();
           });

           $scope.playMany(randomTracks);
        };


        $scope.fetchAndAddTracks = function(track, action){
            if(action === 'add'){
                console.log(track.track);
                $scope.addTrack(track.track);
            } else {
                console.log(track.track);
                $scope.play(track.track);
            }

        };

        $scope.addNew = function(){
            setRoot();
            var track = {
                track_title: $scope.form.trackTitle
            };

            apiService.addNew(track)
                .success(function(data, status) {
                    console.log(data.track);
                    $scope.tracks.push(data.track);
                    $scope.hide = true;
                    $scope.form = {};
                });
        };

        function setRoot(){
            apiService.root.rootPath = $scope.sitePath + '/track/';
        };
    });
