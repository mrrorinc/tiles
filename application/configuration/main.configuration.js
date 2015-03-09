'use strict';
angular.module('application')
.constant('configuration',{
  apiURL: 'https://shrouded-falls-1626.herokuapp.com',
  localApiURL: 'http://localhost:4444',
  mockURL: 'api-mock',
  loadMockData: false,
  loadLocalData: true,
  mobileScreen: false,
  showGrid: true,
  
  DEFAULT_TILE_SIZE: 144,
  MOCK_STREAM_LENGTH: 1,
  RENDER_FORCE_DELAY: 4,
  RENDER_UPDATE_DURATION: 64,
  ROUTE_FORCE_DELAY: 360,
  SHUFFLE_BUFFER_LENGTH: 4,
  WINDOW_INITIAL_DELAY: 224,
  WINDOW_RESIZE_DELAY: 240
});
