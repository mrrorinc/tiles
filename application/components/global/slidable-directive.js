application.directive('slidable', [
  '$state',
  function($state) {
    return {
      restrict: 'A',
      scope: {
        shown: '=',
        slideableSettings: '=slidable'
      },
      link: function(scope, element, attrs) {
        scope.show = function() {
          var startingCSS = scope.slideableSettings.animated;
          $(element).css(startingCSS, scope.slideableSettings.hidden);
          var targetCSS = {};
          targetCSS[scope.slideableSettings.animated] = scope.slideableSettings.shown;
          $(element).animate(targetCSS, 360, "easeOutCubic");
        };
        scope.hide = function() {
          var startingCSS = scope.slideableSettings.animated;
          $(element).css(startingCSS, scope.slideableSettings.shown);
          var targetCSS = {};
          targetCSS[scope.slideableSettings.animated] = scope.slideableSettings.hidden;
          $(element).animate(targetCSS, 360, "easeOutCubic");
        };
        scope.handleStateChange = function (newState) {
          if (scope.slideableSettings.hideOn)
          {
            if (scope.slideableSettings.hideOn.indexOf(newState) >= 0)
            {
              scope.hide();
            } else {
              scope.show();
            }
          }
        }

        if (scope.slideableSettings.hideOn)
        {
          scope.$watch(function () {
            return $state.current.name;
          },
          function (newValue) {
            scope.handleStateChange(newValue);
          });
        } 
        if (scope.slideableSettings.shownif)
        {
          scope.$watch(function () {
            return scope.shown;
          },
          function (newValue) {
            if (newValue) {
              scope.show();
            } else {
              scope.hide();
            }
          });
        }
      }
    };
  }
]);