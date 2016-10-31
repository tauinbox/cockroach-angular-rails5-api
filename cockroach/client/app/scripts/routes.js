(function() {
  'use strict';

  angular.module('cockroach')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.template.html'
    })
    ;

  }]);

})();