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
      },
      resolve: {
        auth: ['$auth', function ($auth) {
          return $auth.validateUser().catch(function(err) {return err;});
        }]
      }      
    })

    // route to Not Authenticated page
    .state('app.not_authenticated', {
      url: 'not_authenticated',
      views: {
        'content@': {
          templateUrl:  'src/static_pages/not-authenticated.template.html'
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
      },
      resolve: {
        auth: ['$auth', function ($auth) {
          return $auth.validateUser().catch(function(err) {return err;});
        }]
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
      },
      resolve: {
        auth: ['$auth', function ($auth) {
          return $auth.validateUser().catch(function(err) {return err;});
        }]
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
      },
      resolve: {
        auth: ['$auth', '$state', function ($auth, $state) {
          return $auth.validateUser().catch(function(err) {
            $state.go('app.not_authenticated');
          });
        }]
      }      
    })

    // route to Articles edit page
    .state('app.articlesEdit', {
      url: 'articles/:id/edit',
      views: {
        'content@': {
          templateUrl:  'src/articles/articles.new-edit.template.html',
          controller:   'ArticlesController',
          controllerAs: 'artCtrl'
        }
      },
      resolve: {
        auth: ['$auth', '$state', function ($auth, $state) {
          return $auth.validateUser().catch(function(err) {
            $state.go('app.not_authenticated');
          });
        }]
      }       
    })          
    ;

  }]);

})();