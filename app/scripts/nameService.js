'use strict';

angular.module('cfFront')
    .factory('nameService', function(){
        var name = {
            concatName: function(person){
                return person.first_name + ' '
                    + ((person.middle_name !== null && person.middle_name !== undefined) ? person.middle_name + ' ' : '')
                    + person.last_name;
            }
        }

        return name;
    });