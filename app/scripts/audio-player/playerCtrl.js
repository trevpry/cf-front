'use strict';

angular.module('cfFront')
    .controller('playerCtrl', function ($scope, playlistService, nameService) {
        $scope.concatName = nameService.concatName;
        $scope.concatWork = nameService.concatWork;
        $scope.audioPlaylist = playlistService.audioPlaylist;
        $scope.addTrack = playlistService.addTrack;
        $scope.addTracks = playlistService.addTracks;
        $scope.cover_thumb = 'images/albums/th-AL0000000001.jpg';

        $scope.play = function(track){
            console.log(track);
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
                console.log("Now Playing:");
                console.log($scope.nowPlaying);

                $scope.cover_thumb = ($scope.nowPlaying !== undefined
                    && $scope.nowPlaying.album_workversions.album.cover_thumb_path !== null)
                    ? $scope.nowPlaying.album_workversions.album.cover_thumb_path
                    : 'images/albums/th-AL0000000001.jpg';
                //$scope.cover_thumb = 'images/albums/th-AL0000000001.jpg';
            }
        });
    });