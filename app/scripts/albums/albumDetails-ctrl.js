'use strict';

angular.module('cfFront')
    .controller('albumDetailsCtrl', function($scope, $http, $stateParams, $location, apiService){
        $scope.id = $stateParams.albumID;
        $scope.album = {};
        $scope.form = {};
        $scope.workversions = {};
        setRoot();

        $scope.works = {};

        var getWorks = function(workversions){
            var works = [];

            for(var $i = 0; $i < workversions.length; $i++ ){
                works.push(workversions[$i].work);
                works[$i]['workversion'] = [];
                works[$i]['workversion'].push(workversions[$i]);
            }

            return works;
        };

        apiService.getDetails($scope.id)
            .success(function(data, status) {
                $scope.album = data.album;
                $scope.works = getWorks(data.album.workversions);
                console.log($scope.works);
                $scope.form.albumTitle = $scope.album.album_title;
            });

        $scope.edit = function(){
            setRoot();
            var album = {
                album_title: $scope.form.albumTitle
            };

            apiService.edit($scope.id, album)
                .success(function(data, status) {
                    $scope.album = data.album;
                    $scope.hide = true;
                });
        };

        $scope.destroy = function(){
            setRoot();
            apiService.destroy($scope.id)
                .success(function(data, status) {
                    console.log('deleted');
                    $location.path("albums");
                });
        };

        function setRoot(){
            apiService.root.rootPath = $scope.sitePath + '/album/';
        }
    });