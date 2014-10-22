'use strict';

angular.module('cfFront')
    .controller('composerDetailsCtrl', function($scope, $http, $stateParams, $location, apiService, nameService){
        $scope.concatName = nameService.concatName;
        $scope.id = $stateParams.composerID;
        $scope.composer = {};
        $scope.form = {};
        apiService.root.rootPath = 'http://10.0.10.10/composer/';
        $scope.works = {};

        apiService.getDetails($scope.id)
            .success(function(data, status) {
                $scope.composer = data.composer;
                console.log(data.composer);
                $scope.form.firstName = $scope.composer.first_name;
                $scope.form.middleName = $scope.composer.middle_name;
                $scope.form.lastName = $scope.composer.last_name;
                $scope.works = data.composer.works;
            });

        $scope.edit = function(){
            var composer = {
                first_name: $scope.form.firstName,
                middle_name: (($scope.form.middleName !== undefined) ? $scope.form.middleName : ''),
                last_name: $scope.form.lastName
            };

            apiService.edit($scope.id, composer)
                .success(function(data, status) {
                    $scope.composer = data.data;
                    $scope.hide = true;
                });
        };

        $scope.delete = function(){
            apiService.delete($scope.id)
                .success(function(data, status) {
                    console.log('deleted');
                    $location.path("composers");
                });
        };
    });