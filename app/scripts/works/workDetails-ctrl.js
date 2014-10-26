'use strict';

angular.module('cfFront')
    .controller('workDetailsCtrl', function($scope, $http, $stateParams, $location, nameService, apiService){
        $scope.concatName = nameService.concatName;
        $scope.id = $stateParams.workID;
        $scope.work = {};
        $scope.form = {};
        $scope.workversions = {};
        setRoot();

        apiService.getDetails($scope.id)
            .success(function(data, status) {
                $scope.form.workTitle = data.work.work_title;
                $scope.work = data.work;
                $scope.workversions = data.work.workversions;
            });

        $scope.edit = function(){
            setRoot();
            var work = {
                work_title: $scope.form.workTitle
            };

            apiService.edit($scope.id, work)
                .success(function(data, status) {
                    $scope.work = data.work;                    
                    $scope.hide = true;
                });
        };

        $scope.destroy = function(){
            setRoot();
            apiService.destroy($scope.id)
                .success(function(data, status) {
                    console.log('deleted');
                    $location.path("works");
                });
        };

        function setRoot(){
            apiService.root.rootPath = $scope.sitePath + '/work/';
        };
    });