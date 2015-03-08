'use strict';
angular.module('stream')
.controller('streamController' , [
  'StreamService',
  'GridService',
  'configuration',
  '$rootScope',
  '$scope',
  '$timeout',
  '$state',
  '$stateParams',
  function (
    StreamService,
    GridService,
    configuration,
    $rootScope,
    $scope,
    $timeout,
    $state,
    $stateParams
  ) {
    $scope.loadStream = function(streamRoute) {
      if (streamRoute)
      {
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
    
    $timeout(function() {
      var streamRoute = StreamService.routeStream($state.current.url, $stateParams);
      $scope.loadStream(streamRoute);
    }, configuration.ROUTE_FORCE_DELAY);

    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        var streamRoute = StreamService.routeStream(toState.url, toParams);
        $scope.loadStream(streamRoute);
      }
    )      
  }
]);
