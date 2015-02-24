application.directive('tlsNotification', [
  function() {
    return {
      restrict: 'E',
      scope: {
        notification: '='
      },
      templateUrl: './components/notification/notification-directive.html',
      link: function(scope, element, attrs) {
        scope.$on('keypress:13', function(onEvent, keypressEvent) {
          keypressEvent.stopPropagation();
          scope.notification = null;
        });
      },
      controller: function($scope, $timeout, configuration, $state) {}
    }
  }
]);
