'use strict';

angular.module('cfFront')
    .controller('worksCtrl', function($scope, $http, apiService, nameService){
        $scope.concatName = nameService.concatName;
        $scope.form = {};
        apiService.root.rootPath = 'http://10.0.10.10/work/';

        this.initialize = function( works ){
            console.log(works);
            $scope.works = works;
        };

        if ($scope.works === undefined) {
            apiService.getAll()
                .success(function(data, status) {
                    $scope.works = data.works;
                    console.log("all works:" + data);
                });
        };


        $scope.fetchAndAddTracks = function(work, action){
            apiService.getTracks(work.id)
                .success(function(data, status) {
                    if(action === 'add'){
                        $scope.addTracks(data.data);
                    } else {
                        $scope.playMany(data.data);
                    }

                    $scope.$broadcast('flashNotification::message','Tracks added from:' + work.work_title);
                });

        };

        $scope.addNew = function(){

            var work = {
                work_title: $scope.form.workTitle,
                composer_first_name: $scope.form.composerFirstName,
                composer_last_name: $scope.form.composerLastName
            };

            apiService.addNew(work)
                .success(function(data, status) {
                    console.log(data.work);
                    $scope.works.push(data.work);
                    $scope.hide = true;
                    $scope.form = {};
                });
        };

    });
