stream.controller('streamController' , [
  'StreamService',
  'GridService',
  '$rootScope',
  '$state',
  '$stateParams',
  function (
    StreamService,
    GridService,
    $rootScope,
    $state,
    $stateParams
  ) {
    var streamRoute = $state.current.url;
    if ((!$rootScope.currentUser) && ((streamRoute == "/self") || (streamRoute == "/post-new")))
    {
      $state.go("home");
    } else {
      if (streamRoute == '/') {
        streamRoute = '/home';
      }
      if (streamRoute == '/s/:username') {
        streamRoute = '/' + $stateParams.username;
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
]);