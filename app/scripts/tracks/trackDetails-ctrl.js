'use strict';

angular.module('cfFront')
    .controller('trackDetailsCtrl', function($scope, $stateParams, $location, nameService, apiService){
        $scope.concatName = nameService.concatName;
        $scope.id = $stateParams.trackID;
        $scope.track = {};
        $scope.form = {};
        setRoot();

        apiService.getDetails($scope.id)
            .success(function(data, status) {
                $scope.form.trackTitle = data.track.track_title;
                $scope.track = data.track;
            });

        $scope.edit = function(){
            setRoot();
            var track = {
                track_title: $scope.form.trackTitle
            };

            apiService.edit($scope.id, track)
                .success(function(data, status) {
                    $scope.track = data.track;                    
                    $scope.hide = true;
                });
        };

        $scope.destroy = function(){
            setRoot();
            apiService.destroy($scope.id)
                .success(function(data, status) {
                    console.log('deleted');
                    $location.path("tracks");
                });
        };

        function setRoot(){
            apiService.root.rootPath = $scope.sitePath + '/track/';
        };
    });