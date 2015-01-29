'use strict';
application.service('MockAPIService', ['configuration', function (configuration) {
  
  this.generateMockStream = function() {
    var mockStream = [];
    for (var i = 0; i < configuration.MOCK_STREAM_LENGTH; i++) {
      mockStream.push(this.generateMockTile());
    }
    return mockStream;
  }
  
  this.maximumSpan = 4;
  
  this.generateMockTile = function() {
    var mockTile = {
      text: 'Test tile.',
      background: this.getRandomColor(),
      pWidth: this.getTileSpan(),
      pHeight: this.getTileSpan()
    };
    return mockTile;
  }
  
  this.getTileSpan = function() {
    return this.maximumSpan - Math.floor(Math.sqrt(Math.random() * (this.maximumSpan * this.maximumSpan)));
  }
  
  this.getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  this.mock_stream = this.generateMockStream();

  this.get = function(serviceURI) {
    return this['mock_' + serviceURI];
  }
}]);
