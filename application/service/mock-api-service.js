'use strict';
application.service('MockAPIService', ['configuration', function (configuration) {
  
  this.mock_stream = [
    {
      text: '"Be water, my friend!" - Bruce Lee',
      background: '#cccccc',
      color: '#555555',
      pWidth: 3,
      pHeight: 1
    },
    {
      text: '(c) mrror, inc, Brooklyn, NY',
      background: '#000000',
      color: '#555555',
      imageURL: 'http://www.kcconcealedcarry.com/attachments/Image/4_Glock_19_9mm_4th_Gen_2-1703.jpg',
      pWidth: 4,
      pHeight: 3
    },
    {
      text: '(c) mrror, inc, Brooklyn, NY',
      background: '#000000',
      color: '#555555',
      imageURL: 'http://www.supics.com/wp-content/uploads/2012/06/Big-Young-Hot-Japanese-Boobs-Girl.jpg',
      pWidth: 2,
      pHeight: 1
    },
    {
      text: '(c) mrror, inc, Brooklyn, NY',
      background: '#000000',
      color: '#555555',
      imageURL: 'http://image.superstreetonline.com/f/features/8842956/0605_it_mitsubishi_lancer_evolution_8_mr_01_z.jpg',
      pWidth: 3,
      pHeight: 2
    },
    {
      text: '(c) mrror, inc, Brooklyn, NY',
      background: '#000000',
      color: '#555555',
      imageURL: 'https://s-media-cache-ak0.pinimg.com/236x/7d/fa/e3/7dfae379004b619b98f16c44b3eed41b.jpg',
      pWidth: 1,
      pHeight: 2
    },
    {
      text: '(c) mrror, inc, Brooklyn, NY',
      background: '#000000',
      color: '#555555',
      imageURL: 'http://glock19gen4.com/wp-content/uploads/2012/06/Glock-19-Gen-4-Trigger.jpg',
      pWidth: 2,
      pHeight: 1
    },
    {
      text: '(c) mrror, inc, Brooklyn, NY',
      background: '#000000',
      color: '#555555',
      imageURL: 'http://www.omgsoysauce.com/wp-content/uploads/2009/08/mai-nishida-hot-asian-japanese-idol-sexy-girls-7.jpg',
      pWidth: 3,
      pHeight: 2
    },
    {
      text: '(c) mrror, inc, Brooklyn, NY',
      background: '#000000',
      color: '#555555',
      imageURL: 'http://image.superstreetonline.com/f/features/modp-1206-2005-mitsubishi-evolution-mr/37259942/modp-1206-08%252B2005-mitsubishi-evolution-mr%252Brear-view.jpg',
      pWidth: 2,
      pHeight: 1
    },
    {
      text: '(c) mrror, inc, Brooklyn, NY',
      background: '#000000',
      color: '#555555',
      imageURL: 'http://cdn.cavemancircus.com//wp-content/uploads/images/2012/august/asian_3/hot_asian_girls_11.jpg',
      pWidth: 2,
      pHeight: 2
    },
    {
      text: '(c) 2015 mrror, inc, Brooklyn, NY',
      background: '#000000',
      color: '#ffffff',
      pWidth: 2,
      pHeight: 1
    },
    {
      text: '(c) mrror, inc, Brooklyn, NY',
      background: '#000000',
      color: '#555555',
      imageURL: 'http://cdn2.cdnme.se/cdn/6-1/806720/images/2009/beautiful-asian-bikini-girls-playing-football-in-mud_51855120.jpg',
      pWidth: 2,
      pHeight: 3
    },
    {
      text: '(c) mrror, inc, Brooklyn, NY',
      background: '#000000',
      color: '#555555',
      imageURL: 'http://image.superstreetonline.com/f/features/modp-0905-2006-mitsubishi-lancer-evolution-mr/17861101/modp-0905-02-o-2006-mitsubishi-lancer-evolution-mr-rear-view.jpg',
      pWidth: 4,
      pHeight: 3
    },
    {
      text: '(c) mrror, inc, Brooklyn, NY',
      background: '#000000',
      color: '#555555',
      imageURL: 'http://i37.tinypic.com/aw7ki.jpg',
      pWidth: 2,
      pHeight: 3
    },
    {
      background: '#000000',
      color: '#555555',
      imageURL: 'http://huntsmanblog.ru/wp-content/uploads/2014/06/glock_19_gen_4_by_thebadpanda2-d6la2ng.jpg',
      pWidth: 3,
      pHeight: 2
    },
    {
      text: '(c) mrror, inc, Brooklyn, NY',
      background: '#000000',
      color: '#555555',
      imageURL: 'http://25.media.tumblr.com/tumblr_llxvm3sYRG1qbnbjto1_400.jpg',
      pWidth: 2,
      pHeight: 1
    },
    {
      background: '#000000',
      color: '#555555',
      imageURL: 'http://huntsmanblog.ru/wp-content/uploads/2014/06/glock_19_gen_4_by_thebadpanda2-d6la2ng.jpg',
      pWidth: 3,
      pHeight: 2
    },
    {
      background: '#000000',
      color: '#555555',
      imageURL: 'http://www.rockyourglock.com/mm5/graphics/00000001/pink%20extended%20mag%20release%20glock%20gen4.1.jpg',
      pWidth: 1,
      pHeight: 1
    },
    {
      text: '"The brick don`t hit back!" - Bolo Yeung',
      background: '#999999',
      color: '#555555',
      pWidth: 2,
      pHeight: 1
    },
    {
      background: '#000000',
      color: '#555555',
      imageURL: 'http://www.mrstyleking.com/wp-content/uploads/2013/07/hot-asian-girls-women-110.jpg',
      pWidth: 2,
      pHeight: 3
    },
    {
      background: '#000000',
      color: '#555555',
      imageURL: 'http://cdn1.bigcommerce.com/server1900/b82e1/products/202/images/1136/glock_29_gen4_10mm_for_sale_3__67752.1408364839.1280.1280.jpg?c=2',
      pWidth: 2,
      pHeight: 1
    },
    {
      background: '#000000',
      color: '#555555',
      imageURL: 'https://isaminorthreat.files.wordpress.com/2012/10/hot-asian-girl7.jpg',
      pWidth: 3,
      pHeight: 2
    },
    {
      text: 'This is an experimental responsive layout project written in AngularJS and ES5.',
      background: '#005500',
      color: '#ffffff',
      pWidth: 1,
      pHeight: 2
    },
    {
      text: '"Assumption is the mother of all fuck-ups." - Steven Seagal',
      background: '#555555',
      color: '#cccccc',
      pWidth: 2,
      pHeight: 2
    }
  ];
  
  this.mock_content_stream = [];

  this.generateMockStream = function() {
    var mockStream = [];
    for (var i = 0; i < configuration.MOCK_STREAM_LENGTH; i++) {
      mockStream.push(this.generateMockTile());
    }
    return mockStream;
  }
  
  this.generateMockContentStream = function() {
    this.mock_content_stream = [];
    var counter = 0;
    while (this.mock_content_stream.length < configuration.MOCK_STREAM_LENGTH)
    {
      var newTile = angular.copy(this.mock_stream[counter]);
      newTile.id = Math.floor(Math.random() * 999999999);
      this.mock_content_stream.push(newTile);
      counter++;
      if (counter >= this.mock_stream.length) {
        counter = 0;
      }
    }
    return this.mock_content_stream;
  }
  
  this.maximumSpan = 5;
  
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

  // this.mock_stream = this.generateMockStream();

  this.get = function(serviceURI) {
    return this['mock_' + serviceURI];
  }
}]);
