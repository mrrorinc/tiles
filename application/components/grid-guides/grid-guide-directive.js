'use strict';
angular.module('application')
.directive('tlsGridGuide', [
  function() {
    return {
      restrict: 'E',
      scope: {
        orientation: "="
      },
      templateUrl: './components/grid-guides/grid-guide-directive.html',
      controller: function($scope) {}
    }
  }
]);
