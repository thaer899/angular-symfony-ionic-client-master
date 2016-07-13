angular.module('App', ['ionic','ionic.contrib.ui.tinderCards'])

.config(function($stateProvider, $urlRouterProvider,$httpProvider, $ionicConfigProvider, uiGmapGoogleMapApiProvider) 
{ 
		
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDEsl1ZFNc1MycjVELDZND1BDUVEuJSx14',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    })

  $stateProvider
  .state('menu', {
    url: '/menu',
    abstract: true,
      controller: 'MenuController',
      templateUrl: 'views/menu/menu.html'
  })
    .state('app.start', {
    url: '/start',
    views: {
      'menuContent': {
        templateUrl: 'views/menu/start.html'
      }
    }
  })
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html'
    })
    .state('reservation', {
      url: '/reservation',
      controller: 'ReservationController',
      templateUrl: 'views/reservation/reservation.html'
    })
   .state('page', {
      url: '/page',
      controller: 'PageController',
      templateUrl: 'views/page/page.html'
    })
  .state('edit_page', {
      url: '/edit_page',
      controller: 'EditPageController',
      templateUrl: 'views/edit_page/edit_page.html'
    })
  .state('article', {
      url: '/article',
      controller: 'ArticleController',
      templateUrl: 'views/article/article.html'
    })
    .state('article_show', {
      url: '/article_show',
      controller: 'ArticleShowController',
      templateUrl: 'views/article_show/article_show.html'
    })
    .state('weather', {
      url: '/weather',
      controller: 'WeatherController',
      templateUrl: 'views/weather/weather.html'
    })
    .state('restaurants', {
      url: '/restaurants',
      controller: 'RestaurantsController',
      templateUrl: 'views/restaurants/restaurants.html'
    })
     .state('maps', {
      url: '/maps',
      controller: 'MapsController',
      templateUrl: 'views/maps/maps.html'
    })
    .state('tour', {
      url: '/tour',
      templateUrl: 'views/tour/tour.html'
    });

  $urlRouterProvider.otherwise('/tour');

})
.directive('markdown', function () {
  var converter = new Showdown.converter();
  return {
    scope: {
      markdown: '@'
    },
    link: function (scope, element, attrs) {
      scope.$watch('markdown', function () {
        var content = converter.makeHtml(attrs.markdown);
        element.html(content);
      });
    }
  }
})
.directive('noScroll', function() {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $element.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})
.service('PageService', function () {
   //  var id = 0;
     var pageService = {
       id:0,
       page:{},
       menu:{},
       article:{},
       articles:[]
     };
    return pageService;
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });


});