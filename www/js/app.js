angular.module('App', ['ionic'])

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
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