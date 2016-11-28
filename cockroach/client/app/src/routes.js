(function() {
  'use strict';

  angular.module('cockroach')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    // remove the Hash tag (#) for a pretty URL
    if(window.history && window.history.pushState) {
      $locationProvider.html5Mode(true);
    }  

    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider

    // route to Home page
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

    // route to About page
    .state('app.about', {
      url: 'about',
      views: {
        'content@': {
          templateUrl:  'src/static_pages/about.template.html'
        }
      }
    })    

    // route to Articles index page
    .state('app.articles', {
      url: 'articles',
      views: {
        'content@': {
          templateUrl:  'src/articles/articles.index.template.html',
          controller:   'ArticlesController',
          controllerAs: 'artCtrl'
        }
      }
    })

    // route to Articles show page
    .state('app.articlesShow', {
      url: 'articles/:id',
      views: {
        'content@': {
          templateUrl:  'src/articles/articles.show.template.html',
          controller:   'ArticlesController',
          controllerAs: 'artCtrl'
        }
      }
    })    

    // route to Articles new page
    .state('app.articlesNew', {
      url: 'new_article',
      views: {
        'content@': {
          templateUrl:  'src/articles/articles.new-edit.template.html',
          controller:   'ArticlesController',
          controllerAs: 'artCtrl'
        }
      }
    })      
    ;

  }]);

})();