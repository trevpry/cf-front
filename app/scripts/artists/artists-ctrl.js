'use strict';

angular.module('cfFront')
    .controller('artistsCtrl', function($scope, $http, $rootScope, apiService, nameService){
        $scope.concatName = nameService.concatName;
        $scope.form = {};
        $scope.artists = {};
        setRoot();

        apiService.getAll()
            .success(function(data, status) {
                $scope.artists = data.artists;
                console.log(data);
        });

        $scope.fetchAndAddTracks = function(artist, action){
            apiService.getTracks(artist.id)
                .success(function(data, status) {
                    $scope.added = artist;
                    console.log(data.playlist);

                    if(action === 'add'){
                        $scope.addTracks(data.playlist);
                    } else {
                        $scope.playMany(data.playlist);
                    }

                    $scope.$broadcast('flashNotification::message','Tracks added from:' + artist.last_name);
                });
        };

        $scope.addNew = function(){

            var artist = {
                first_name: $scope.form.firstName,
                middle_name: (($scope.form.middleName !== undefined) ? $scope.form.middleName : ''),
                last_name: $scope.form.lastName
            };

            apiService.addNew(artist)
                .success(function(data, status) {
                    $scope.artists.push(data.artist);
                    $scope.hide = true;
                    $scope.form = {};
                });
        };

        function setRoot(){
            apiService.root.rootPath = $scope.sitePath + '/artist/';
        };
    });
