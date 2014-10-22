'use strict';

angular.module('cfFront')
    .controller('albumsCtrl', function($scope, $http, $rootScope, apiService){
        $scope.form = {};
        apiService.root.rootPath = 'http://10.0.10.10/album/';

        apiService.getAll()
            .success(function(data, status) {
                $scope.albums = data.albums;
                console.log(data);
        });

        $scope.fetchAndAddTracks = function(album, action){
            apiService.getTracks(album.id)
                .success(function(data, status) {
                    if(action === 'add'){
                        $scope.addTracks(data.data);
                    } else {
                        $scope.playMany(data.data);
                    }

                    $scope.$broadcast('flashNotification::message','Tracks added from:' + album.album_title);
                });
        };

        $scope.addNew = function(){

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
    });
