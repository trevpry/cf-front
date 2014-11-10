'use strict';

angular.module('cfFront')
    .factory('nameService', function(){
        var isset = function(value){
            return (value !== '' && value !== null);
        }

        var name = {
            concatName: function(person){
                return person.first_name + ' '
                    + ((person.middle_name !== null && person.middle_name !== undefined) ? person.middle_name + ' ' : '')
                    + person.last_name;
            },

            concatWork: function(work){
                return work.work_title +
                    ' ' +
                    (isset(work.work_number) ? 'No ' + work.work_number : '') +
                    ' ' +
                    (isset(work.key) ? 'in ' + work.key : '') +
                    ' ' +
                    (isset(work.opus_number) ? 'Opus ' + work.opus_number : '') +
                    ((isset(work.opus_number) && isset(work.catalog_number)) ? ', ' : '') +
                    (isset(work.catalog_number) ? work.catalog_number : '');
            }
        }

        return name;
    });