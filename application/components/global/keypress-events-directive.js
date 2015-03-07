'use strict';
angular.module('application')
.directive('tlsKeypressEvents', [
  '$document',
  function(
    $document
  ) {
    return {
      restrict: 'A',
      scope: {
        tlsKeypressEvents: '&'
      },
      link: function(scope, element, attrs) {
        $document.bind('keypress', function(event) {
          scope.tlsKeypressEvents({keyCode: event.which});
        });
      }
    };
  }
]);