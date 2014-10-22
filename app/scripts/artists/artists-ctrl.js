'use strict';

angular.module('cfFront')
    .controller('artistsCtrl', function($scope, $http, $rootScope, apiService, nameService){
        $scope.concatName = nameService.concatName;
        $scope.form = {};
        apiService.root.rootPath = 'http://10.0.10.10/artist/';

        apiService.getAll()
            .success(function(data, status) {
                $scope.artists = data.artists;
                console.log(data);
        });

        //$scope.fetchAndAddTracks = function(composer, action){
        //    apiService.getTracks(composer.id)
        //        .success(function(data, status) {
        //            $scope.added = composer;
        //            console.log(data.data);
        //
        //            if(action === 'add'){
        //                $scope.addTracks(data.data);
        //            } else {
        //                $scope.playMany(data.data);
        //            }
        //
        //            $scope.$broadcast('flashNotification::message','Tracks added from:' + composer.last_name);
        //        });
        //};
        //
        //$scope.addNew = function(){
        //
        //    var composer = {
        //        first_name: $scope.form.firstName,
        //        middle_name: (($scope.form.middleName !== undefined) ? $scope.form.middleName : ''),
        //        last_name: $scope.form.lastName
        //    };
        //
        //    apiService.addNew(composer)
        //        .success(function(data, status) {
        //            $scope.composers.push(data.composer);
        //            $scope.hide = true;
        //            $scope.form = {};
        //        });
        //};
    });
