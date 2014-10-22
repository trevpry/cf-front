'use strict';

angular.module('cfFront')
    .controller('albumDetailsCtrl', function($scope, $http, $stateParams, $location, apiService){
        $scope.id = $stateParams.albumID;
        $scope.album = {};
        $scope.form = {};
        $scope.workversions = {};
        apiService.root.rootPath = 'http://10.0.10.10/album/';

        $scope.works = {};

        var getWorks = function(workversions){
            var works = [];

            for(var $i = 0; $i < workversions.length; $i++ ){
                works.push(workversions[$i].work);
                works[$i]['workversion'] = [];
                works[$i]['workversion'].push(workversions[$i]);
            }
            console.log(works);
            return works;
        };

        apiService.getDetails($scope.id)
            .success(function(data, status) {
                $scope.album = data.album;
                console.log(data.album);
                //$scope.workversions = data.workversions;
                $scope.works = getWorks(data.album.workversions);
                $scope.form.albumTitle = $scope.album.album_title;
            });

        $scope.edit = function(){
            var album = {
                album_title: $scope.form.albumTitle
            };

            apiService.edit($scope.id, album)
                .success(function(data, status) {
                    $scope.album = data.album;
                    $scope.hide = true;
                });
        };

        $scope.delete = function(){
            apiService.delete($scope.id)
                .success(function(data, status) {
                    console.log('deleted');
                    $location.path("albums");
                });
        };
    });