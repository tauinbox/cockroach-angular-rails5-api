(function() {
  'use strict';

  angular.module('cockroach')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    // used while resolving user validation ('auth' property) to authenticate user when it necessarily
    var mandatoryAuthentication = ['$auth', '$rootScope', '$q', function ($auth, $rootScope, $q) {
          return $auth.validateUser().catch(function(err) {
            $rootScope.$broadcast('header:do-authenticate');
            return $q.reject("not authenticated");       
          });
        }];

    // used while resolving user validation ('auth' property) to check if user is already authenticated
    var checkIfAuthenticated = ['$auth', function ($auth) {
          return $auth.validateUser().catch(function(err) { return err; });
        }];

    // used to resolve optional injected object (work around)
    var nullFunction = function() { return null; };

    // used to resolve article data
    var preloadArticle = ['$stateParams', '$q', 'articlesSvc', 'popup', function($stateParams, $q, articlesSvc, popup) {
          return articlesSvc.articles.get({ id: $stateParams.id }).$promise.catch(function(error) {
            popup.displayMessage("Can't get article data", (error.statusText.length > 0) ? "Status (" + error.status + "). " + error.statusText : 'request was aborted');
            return $q.reject(error);
          });
        }];

    // remove Hash tag (#) for a pretty URL
    if(window.history && window.history.pushState) {
      $locationProvider.html5Mode(true);
    }  

    // set up default route
    $urlRouterProvider.otherwise('/');

    // set up UI states
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
        auth: checkIfAuthenticated
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
        auth: checkIfAuthenticated,
        articlesData: ['$q', 'articlesSvc', 'popup', function($q, articlesSvc, popup) {
          return articlesSvc.articles.query().$promise.catch(function(error) {
            popup.displayMessage("Can't get articles data", (error.statusText.length > 0) ? "Status (" + error.status + "). " + error.statusText : 'request was aborted');
            return $q.reject(error);
          });
        }],
        articleData: nullFunction
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
        auth: checkIfAuthenticated,
        articlesData: nullFunction,  
        articleData: preloadArticle    
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
        auth: mandatoryAuthentication,
        articlesData: nullFunction,
        articleData: nullFunction                
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
        auth: mandatoryAuthentication,
        articlesData: nullFunction,  
        articleData: preloadArticle        
      }       
    })

    // route to Profile show page
    .state('app.profile', {
      url: 'profile',
      views: {
        'content@': {
          templateUrl:  'src/profile/profile.show.template.html',
          controller:   'ProfileController',
          controllerAs: 'profileCtrl'
        }
      },
      resolve: {
        auth: mandatoryAuthentication
      }      
    })

    // route to Profile edit page
    .state('app.profileEdit', {
      url: 'profile/:user_id',
      views: {
        'content@': {
          templateUrl:  'src/profile/profile.edit.template.html',
          controller:   'ProfileController',
          controllerAs: 'profileCtrl'
        }
      },
      resolve: {
        auth: mandatoryAuthentication
      }      
    })              
    ;

  }]);

})();