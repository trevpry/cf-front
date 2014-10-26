'use strict';

angular.module('cfFront')
    .controller('composerDetailsCtrl', function($scope, $http, $stateParams, $location, apiService, nameService){
        $scope.concatName = nameService.concatName;
        $scope.id = $stateParams.composerID;
        $scope.composer = {};
        $scope.form = {};
        $scope.works = {};
        setRoot();

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
            setRoot();
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

        $scope.destroy = function(){
            setRoot();
            apiService.destroy($scope.id)
                .success(function(data, status) {
                    console.log('deleted');
                    $location.path("composers");
                });
        };

        function setRoot(){
            apiService.root.rootPath = $scope.sitePath + '/composer/';
        };
    });