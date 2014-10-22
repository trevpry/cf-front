'use strict';

angular.module('cfFront')
    .factory('composerService', function($http){
        var root = 'http://10.0.10.10/composer/';

        var getAllComposers = function() {
            return $http({
                method: 'GET',
                url: root
            });
        };

        var getComposerDetails = function(id) {
            return $http({
                method: 'GET',
                url: root + id,
                id: id
            });
        };

        var getComposerTracks = function(id) {
            return $http({
                method: 'GET',
                url: root + id + '/tracks'
            });
        };

        var addNew = function(composer) {
            return $http({
                method: 'POST',
                url: root,
                data: composer
            });
        };

        var edit = function(id, composer) {
            return $http({
                method: 'PUT',
                url: root + id,
                data: composer
            });
        };

        var deleteComposer = function(id) {
            return $http({
                method: 'DELETE',
                url: root + id
            });
        };

        return {
            getAllComposers: function() { return getAllComposers(); },
            getComposerDetails: function(id) { return getComposerDetails(id); },
            getComposerTracks: function(id) { return getComposerTracks(id); },
            addNew: function(composer) { return addNew(composer); },
            edit: function(id, composer) { return edit(id, composer); },
            delete: function(id) { return deleteComposer(id); }
        };
    });

