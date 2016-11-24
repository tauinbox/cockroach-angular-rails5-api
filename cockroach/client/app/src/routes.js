(function() {
  'use strict';

  angular.module('cockroach')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider
    // route for the home page
    .state('app', {
      url: '/',
        views: {
          'header': {
            templateUrl:  'src/header/header.template.html',
            controller:   'HeaderController',
            controllerAs: 'headCtrl'
          },
          'content': {
            templateUrl:  'src/home/home.template.html',
            controller:   'HomeController',
            controllerAs: 'homeCtrl'
          },
          'footer': {
            templateUrl : 'src/footer/footer.template.html'
          }
        }
    })
    // route for the articles page
    .state('app.articles', {
      url: 'articles',
        views: {
          'content@': {
            templateUrl:  'src/articles/articles.template.html',
            controller:   'ArticlesController',
            controllerAs: 'artCtrl'
          }
        }
    })    
    ;

  }]);

})();