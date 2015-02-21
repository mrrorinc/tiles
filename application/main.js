'use strict';

/**
 * Entry point of application
 * @module app
 *
 */
var application = angular.module('application' , [
  'ui.router',
  'restangular',
  'ngSanitize',
  'ngAnimate',
  'mgcrea.ngStrap',
  'stream',
  'login',
  'logout',
  'join',
  'postNew'
]);

application.config(function ($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider, configuration) {
  $urlRouterProvider.otherwise('/');
  
  if (configuration.loadMockData) {
    RestangularProvider.setBaseUrl(configuration.mockURL);
    configuration.baseURL = configuration.mockURL;
  } else {
    RestangularProvider.setBaseUrl(configuration.apiURL);
    configuration.baseURL = configuration.apiURL;
  }

  RestangularProvider.setResponseExtractor(function (response , operation) {
    /**
     * @TODO - Restangular.one().get() requests
     * return a responses without data property,
     * change the API or adjust response extractor
     * accordingly?
     */
    // if (operation === 'get') {
    //   return response;
    // } else {
    //   return response.data;
    // }
  });
  
  RestangularProvider.setDefaultHttpFields({
      withCredentials: true
  });
});

application.run(function(configuration, GridService, StreamService, APIService, $rootScope, $window, $timeout, $state) {
  $rootScope.windowWidth = $window.innerWidth;
  angular.element($window).bind('resize',function(){
    $rootScope.windowWidth = $window.innerWidth;
    $rootScope.$apply('windowWidth');
    if ($rootScope.resizeTimeout)
    {
      $timeout.cancel($rootScope.resizeTimeout);
    }
    $rootScope.resizeTimeout = $timeout(function() {
      GridService.calculateGrid();
      StreamService.renderStream();
    }, configuration.WINDOW_RESIZE_DELAY);
  });
  
  StreamService.getStream().then(function(data) {
    $rootScope.streamRendered = StreamService.streamRendered;
    $rootScope.tilesize = GridService.getTileSize();

    StreamService.currentStream = data.data;
    StreamService.remainingStream = StreamService.currentStream;
    StreamService.renderStream();
  }, function(error) {
    alert("ERROR GETTING STREAM.");
  });
  
  APIService.get("/user/session").then(function(data) {
    $rootScope.currentUser = data.data;
  }, function(error) {
      alert("ERROR " + error);
    })
});
