(function() {
  'use strict';

  angular.module('cockroach')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    // Set up UI states
    $stateProvider
    .state('home', {
      url: '/home',
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
    ;

  }]);

})();