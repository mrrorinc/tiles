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
      background: '#000000',
      color: '#555555',
      imageURL: 'http://www.nationofchange.org/2014/wp-content/uploads/PitBullBan.jpg',
      pWidth: 3,
      pHeight: 2
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
      background: '#000000',
      color: '#555555',
      imageURL: 'http://www.dogbreedinfo.com/images24/PitbullDogDogsChevy3YearsOld.jpg',
      pWidth: 2,
      pHeight: 2
    },
    {
      background: '#000000',
      color: '#555555',
      imageURL: 'http://moderndogmagazine.com/sites/default/files/styles/slidehsow-banner/public/images/articles/top_images/PitBull-hd.jpg?itok=U0Kk3wkD',
      pWidth: 2,
      pHeight: 1
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
      background: '#000000',
      color: '#555555',
      imageURL: 'https://liteweb.ca/images/2014/angular.png',
      pWidth: 4,
      pHeight: 2
    },
    {
      background: '#000000',
      color: '#555555',
      imageURL: 'http://www.321dogs.com/pictures/pit_bull_wallpaper.jpg',
      pWidth: 3,
      pHeight: 2
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
      background: '#000000',
      color: '#555555',
      imageURL: 'http://i2.cdn.turner.com/cnnnext/dam/assets/121128094015-mnn-pit-bull-story-top.jpg',
      pWidth: 4,
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
      background: '#000000',
      color: '#555555',
      imageURL: 'http://www.321dogs.com/pictures/pit_bull_wallpaper_2.jpg',
      pWidth: 3,
      pHeight: 2
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
      background: '#000000',
      color: '#555555',
      imageURL: 'http://lp1.pinkbike.org/p4pb6395752/p4pb6395752.jpg?__SQUARESPACE_CACHEVERSION=1314815844062',
      pWidth: 3,
      pHeight: 2
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
      background: '#000000',
      color: '#555555',
      imageURL: 'http://bikereviews.com/wp-content/uploads/2011/01/black-market-40-oz-forks-and-molly-hatchet-handlebar.jpg',
      pWidth: 3,
      pHeight: 2
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
      imageURL: 'http://198.170.237.117/images/products/full/nsf_bg.jpg',
      pWidth: 2,
      pHeight: 2
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
      imageURL: 'http://media.chainreactioncycles.com//is/image/ChainReactionCycles/prod58125_IMGSET?wid=500&hei=500',
      pWidth: 2,
      pHeight: 1
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
      imageURL: 'http://www.4downdistribution.com/v3/wp-content/uploads/2014/03/Animal_BMXPlus_Jan14_UPDATED-1.jpg',
      pWidth: 4,
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
      background: '#000000',
      color: '#555555',
      imageURL: 'http://ep1.pinkbike.org/p4pb5366321/p4pb5366321.jpg',
      pWidth: 4,
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
      imageURL: 'http://mellonbmx.com/wp-content/uploads/2012/07/Mike-Hoder-Bike-Check07.jpg',
      pWidth: 4,
      pHeight: 2
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
      imageURL: 'http://www.conjay.com/2048%20Handgun%2040%20SW,%2010mm,%2010mm%20Magnum,%20400%20Corbon.jpg',
      pWidth: 4,
      pHeight: 1
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
      imageURL: 'http://www.handgunsmag.com/files/2014/09/Defensive_Ammo_3_fin.jpg',
      pWidth: 4,
      pHeight: 2
    },
    {
      background: '#000000',
      color: '#555555',
      imageURL: 'https://isaminorthreat.files.wordpress.com/2012/10/hot-asian-girl7.jpg',
      pWidth: 3,
      pHeight: 2
    },
    {
      background: '#000000',
      color: '#555555',
      imageURL: 'http://www.knife-planet.com/cold-steel-knives/cold-steel-80pgt-gi-tanto-military-knife-combat.jpg',
      pWidth: 5,
      pHeight: 1
    },
    {
      text: 'This is an experimental responsive layout project written in AngularJS and ES5.',
      background: '#005500',
      color: '#ffffff',
      pWidth: 1,
      pHeight: 2
    },
    {
      background: '#000000',
      color: '#555555',
      imageURL: 'http://images.knifecenter.com/thumb/1500x1500/knifecenter/coldsteel/images/39LSFTw.jpg',
      pWidth: 5,
      pHeight: 3
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
