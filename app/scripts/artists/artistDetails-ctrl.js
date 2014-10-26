'use strict';

angular.module('cfFront')
    .controller('artistDetailsCtrl', function($scope, $http, $stateParams, $location, apiService, nameService){
        $scope.concatName = nameService.concatName;
        $scope.id = $stateParams.artistID;
        $scope.artist = {};
        $scope.form = {};
        setRoot();
        $scope.works = {};

        apiService.getDetails($scope.id)
            .success(function(data, status) {
                $scope.artist = data.artist;
                console.log(data.artist);
                $scope.form.firstName = $scope.artist.first_name;
                //$scope.form.middleName = $scope.artist.middle_name;
                $scope.form.lastName = $scope.artist.last_name;
            });

        $scope.edit = function(){
            setRoot();
            var artist = {
                first_name: $scope.form.firstName,
                //middle_name: (($scope.form.middleName !== undefined) ? $scope.form.middleName : ''),
                last_name: $scope.form.lastName
            };

            apiService.edit($scope.id, artist)
                .success(function(data, status) {
                    $scope.artist = data.data;
                    $scope.hide = true;
                });
        };

        $scope.destroy = function(){
            setRoot();
            apiService.destroy($scope.id)
                .success(function(data, status) {
                    console.log('deleted');
                    $location.path("artist");
                });
        };

        function setRoot(){
            apiService.root.rootPath = $scope.sitePath + '/artist/';
        }
    });