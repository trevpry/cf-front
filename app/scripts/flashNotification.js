'use strict';

angular.module('cfFront')
    .directive('flashNotification', function($animate,$timeout) {
    var flashNotification = {
        restrict: 'E',
        scope: {},
        link: function postLink(scope, iElement, iAttrs) {
            console.log('flash');

            scope.$on('flashNotification::message', function(e, message) {
                var messageElement = angular.element('<div class="flash-notification-message alert alert-success"></div>');
                messageElement.text(message);
                iElement.append(messageElement);
                $timeout(function() {
                    $animate.leave(messageElement);
                },5000); // Can customise time
            });
        }
    };
    return flashNotification;
});