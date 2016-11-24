(function() {
  
  'use strict';

  angular.module('cockroach', ['ui.router', 'ui.bootstrap', 'ngResource', 'ngDialog', 'ng-token-auth'])
  .constant("baseURL", "http://localhost:3000/")
  .config(['$authProvider', '$locationProvider', 'baseURL', function($authProvider, $locationProvider, baseURL) {

    $authProvider.configure({ apiUrl: baseURL });

    // remove the Hash tag (#) for a pretty URL
    if(window.history && window.history.pushState) {
      $locationProvider.html5Mode(true);
    }    

  }]);
  
})();