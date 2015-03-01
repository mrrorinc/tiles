'use strict';
angular.module('application')
.directive('tlsImageLoad', function() {
  return {
    restrict: 'A',
    scope: {
      loadHandler: '&tlsImageLoad' // 'imgLoad'
    },
    link: function(scope, element, attr) {
      element.on('load', scope.loadHandler);
    }
  };
});
