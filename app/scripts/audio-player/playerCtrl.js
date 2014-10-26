'use strict';

angular.module('cfFront')
    .controller('playerCtrl', function ($scope, playlistService) {

        $scope.audioPlaylist = playlistService.audioPlaylist;
        $scope.addTrack = playlistService.addTrack;
        $scope.addTracks = playlistService.addTracks;

        $scope.play = function(track){
            var path = track.audiofiles[0].file_path;

            $scope.audioPlaylist = [];
            $scope.audio1.currentTrack = 0;
            $scope.audio1.load({ src: path, type: 'audio/mp3' }, true);

            $scope.addTrack(track);

            $scope.nowPlaying = track;
            console.log(path);
        };

        $scope.playMany = function(tracks){
            $scope.play(tracks[0].track);
            tracks.splice(0,1);

            $scope.addTracks(tracks);
        };

        //Changes nowPlaying to the current track on next
        $scope.$watch(function() {
            return $scope.audio1.currentTrack;
        }, function() {
            if ($scope.audio1.currentTrack != 0) {
                $scope.nowPlaying = ($scope.audioPlaylist[$scope.audio1.currentTrack - 1].track);
                console.log($scope.nowPlaying);
            }
        });
    });