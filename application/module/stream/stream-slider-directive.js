'use strict';
angular.module('application')
.directive('tlsStreamSlider', [
  'GridService',
  'StreamService',
  'APIService',
  '$timeout',
  'configuration',
  '$window',
  '$state',
  '$rootScope',
  function (
    GridService,
    StreamService,
    APIService,
    $timeout,
    configuration,
    $window,
    $state,
    $rootScope
  ) {
  return {
    restrict :'E' ,
    scope: {
      stream: '=',
      tilesize: '='
    },
    templateUrl :'./module/stream/stream-slider-directive.html' ,
    link: function(scope, element, attrs) {
      scope.firstLoad = true;
      
      scope.updateStreamContainer = function() {
        $('.stream-container').css('width', GridService.currentTileSize * GridService.currentColumnsSuggested + 1);
        $('.stream-container').css('left', GridService.currentMargin);
        $window.scrollTo(0, 0); 
      }
      
      scope.adjustPadding = function() {
        $('tls-stream-slider').css('paddingTop', Math.floor(($window.innerHeight / 100) * 12) + 'px');
      }
      
      
      scope.$watch(function () {
        return scope.tilesize;
      },
      function (newValue) {
        if (typeof newValue !== 'undefined') {
          scope.updateStreamContainer();
        }
      });
      
      scope.$watch(function () {
        return scope.stream.length;
      },
      function (newValue) {
        if (newValue < 2)
        {
          $window.scrollTo(0, 0);
        }
      });
      
      angular.element($window).bind('resize',function(){
        if (scope.resizeTimeout)
        {
          $timeout.cancel(scope.resizeTimeout);
        }
        scope.resizeTimeout = $timeout(function() {
          scope.adjustPadding();
          GridService.calculateGrid();
          StreamService.renderStream();
        }, configuration.WINDOW_RESIZE_DELAY);
      });
      
      // TODO: refactor logic to stream-service
      $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
          var streamRoute = toState.url;
          if (streamRoute == '/s/:username') {
            streamRoute = '/' + toParams.username;
          } else {
            if (streamRoute == '/') {
              streamRoute = '/home';
            } else {
              if ((streamRoute != '/self') && (streamRoute != '/post-new')) {
                streamRoute = '/default';
              }
            }
          }
          if (scope.firstLoad || (streamRoute != '/default'))
          {
            if (streamRoute != '/post-new')
            {
              if (scope.firstLoad)
              {
                if (streamRoute == '/default')
                {
                  streamRoute = '/home';
                }
                scope.firstLoad = false;
              }
              StreamService.getStream(streamRoute).then(function(data) {
                $rootScope.streamRendered = StreamService.streamRendered;
                $rootScope.tilesize = GridService.getTileSize();

                StreamService.currentStream = data.data;
                StreamService.remainingStream = StreamService.currentStream;
                StreamService.renderStream();
              }, function(error) {
                alert("ERROR GETTING STREAM.");
              });            
            }
          }
        }
      )      
      
      element.ready(function() {
        scope.adjustPadding();
        
        APIService.get("/user/session").then(function(data) {
          $rootScope.currentUser = data.data;
        }, function(error) {
            alert("ERROR " + error);
        });        
      });
    },
    controller :function ($scope) {
    }
  }
}]);
