'use strict';

angular.module('cfFront')
    .controller('composersCtrl', function($scope, $http, apiService){
        $scope.form = {};
        setRoot();

        apiService.getAll()
            .success(function(data, status) {
                $scope.composers = data.composers;
                console.log(data);
        });

        $scope.fetchAndAddTracks = function(composer, action){
            setRoot();
            apiService.getTracks(composer.id)
                .success(function(data, status) {
                    $scope.added = composer;
                    console.log(data.playlist);

                    if(action === 'add'){
                        $scope.addTracks(data.playlist);
                    } else {
                        $scope.playMany(data.playlist);
                    }

                    $scope.$broadcast('flashNotification::message','Tracks added from:' + composer.last_name);
                });
        };

        $scope.addNew = function(){
            setRoot();

            var composer = {
                composer_first_name: $scope.form.firstName,
                composer_middle_name: (($scope.form.middleName !== undefined) ? $scope.form.middleName : ''),
                composer_last_name: $scope.form.lastName
            };

            apiService.addNew(composer)
                .success(function(data, status) {
                    $scope.composers.push(data.composer);
                    $scope.hide = true;
                    $scope.form = {};
                });
        };

        function setRoot(){
            apiService.root.rootPath = $scope.sitePath + '/composer/';
        };
    });
