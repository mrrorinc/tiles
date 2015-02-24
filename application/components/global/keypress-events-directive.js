application.directive('keypressEvents', [
  '$document',
  '$rootScope',
  function($document, $rootScope) {
    return {
      restrict: 'A',
      link: function() {
        $document.bind('keypress', function(e) {
          $rootScope.$broadcast('keypress', e);
        });
      }
    };
  }
]);