'use strict';

angular.module('cfFront')
    .factory('apiService', function($http){
        var root = {
            rootPath: ''
        };

        var getAll = function() {
            return $http({
                method: 'GET',
                url: root.rootPath
            });
        };

        var getDetails = function(id) {
            return $http({
                method: 'GET',
                url: root.rootPath + id
            });
        };

        var getTracks = function(id) {
            return $http({
                method: 'GET',
                url: root.rootPath + id + '/tracks'
            });
        };

        var addNew = function(data) {
            return $http({
                method: 'POST',
                url: root.rootPath,
                data: data
            });
        };

        var edit = function(id, data) {
            return $http({
                method: 'PUT',
                url: root.rootPath + id,
                data: data
            });
        };

        var destroy = function(id) {
            return $http({
                method: 'DELETE',
                url: root.rootPath + id
            });
        };

        return {
            root: root,
            getAll: function() { return getAll(); },
            getDetails: function(id) { return getDetails(id); },
            getTracks: function(id) { return getTracks(id); },
            addNew: function(data) { return addNew(data); },
            edit: function(id, data) { return edit(id, data); },
            destroy: function(id) { return destroy(id); }
        };
    });