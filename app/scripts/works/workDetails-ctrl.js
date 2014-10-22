'use strict';

angular.module('cfFront')
    .controller('workDetailsCtrl', function($scope, $http, $stateParams, $location, nameService, apiService){
        $scope.concatName = nameService.concatName;
        $scope.id = $stateParams.workID;
        $scope.work = {};
        $scope.form = {};
        apiService.root.rootPath = 'http://10.0.10.10/work/';

        apiService.getDetails($scope.id)
            .success(function(data, status) {
                $scope.form.workTitle = data.work.work_title;
                $scope.work = data.work;
            });

        $scope.edit = function(){
            var work = {
                work_title: $scope.form.workTitle
            };

            apiService.edit($scope.id, work)
                .success(function(data, status) {
                    $scope.work = data.work;                    
                    $scope.hide = true;
                });
        }

        $scope.delete = function(){
            apiService.delete($scope.id)
                .success(function(data, status) {
                    console.log('deleted');
                    $location.path("works");
                });
        };
    });