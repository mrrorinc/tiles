application.directive('tlsGlobalNavigation', [function () {
  return {
    restrict :'E' ,
    scope: {
      user: '='
    },
    templateUrl :'./components/global-navigation/global-navigation-directive.html',
    link: function (scope, element, attrs) {
      element.ready(function() {
      });
     },
    controller :function ($scope, $timeout, configuration, $state) {
    }
  }
}]);
