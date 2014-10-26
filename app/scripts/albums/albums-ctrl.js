'use strict';

angular.module('cfFront')
    .controller('albumsCtrl', function($scope, $http, $rootScope, apiService){
        $scope.form = {};
        setRoot();

        apiService.getAll()
            .success(function(data, status) {
                $scope.albums = data.albums;
                console.log(data);
        });

        $scope.fetchAndAddTracks = function(album, action){
            setRoot();
            apiService.getTracks(album.id)
                .success(function(data, status) {
                    if(action === 'add'){
                        $scope.addTracks(data.playlist);
                    } else {
                        $scope.playMany(data.playlist);
                    }

                    $scope.$broadcast('flashNotification::message','Tracks added from:' + album.album_title);
                });
        };

        $scope.addNew = function(){
            setRoot();
            var album = {
                album_title: $scope.form.albumTitle
            };

            apiService.addNew(album)
                .success(function(data, status) {
                    $scope.albums.push(data.album);
                    $scope.hide = true;
                    $scope.form = {};
                });
        };

        function setRoot(){
            apiService.root.rootPath = $scope.sitePath + '/album/';
        };
    });
