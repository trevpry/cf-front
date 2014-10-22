'use strict';

angular.module('cfFront')
    .factory('workService', function($http){
        var root = 'http://10.0.10.10/work/';

        var getAllWorks = function() {
            return $http({
                method: 'GET',
                url: root
            });
        };

        var getWorkDetails = function(id) {
            return $http({
                method: 'GET',
                url: root + id
            });
        };

        var getWorkTracks = function(id) {
            return $http({
                method: 'GET',
                url: root + id + '/tracks'
            });
        };

        var addNew = function(work) {
            return $http({
                method: 'POST',
                url: root,
                data: work
            });
        };

        var edit = function(id, work) {
            return $http({
                method: 'PUT',
                url: root + id,
                data: work
            });
        };

        var deleteWork = function(id) {
            return $http({
                method: 'DELETE',
                url: root + id
            });
        };

        return {
            getAllWorks: function() { return getAllWorks(); },
            getWorkDetails: function(id) { return getWorkDetails(id); },
            getWorkTracks: function(id) { return getWorkTracks(id); },
            addNew: function(work) { return addNew(work); },
            edit: function(id, work) { return edit(id, work); },
            delete: function(id) { return deleteWork(id); }
        };
    });

