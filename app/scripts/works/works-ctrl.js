'use strict';

angular.module('cfFront')
    .controller('worksCtrl', function($scope, $http, apiService, nameService){
        $scope.concatName = nameService.concatName;
        $scope.concatWork = nameService.concatWork;
        $scope.form = {};
        setRoot();

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
            setRoot();
            apiService.getTracks(work.id)
                .success(function(data, status) {
                    if(action === 'add'){
                        $scope.addTracks(data.playlist);
                    } else {
                        $scope.playMany(data.playlist);
                    }

                    $scope.$broadcast('flashNotification::message','Tracks added from:' + work.work_title);
                });

        };

        $scope.addNew = function(){
            setRoot();
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

        function setRoot(){
            apiService.root.rootPath = $scope.sitePath + '/work/';
        };
    });
