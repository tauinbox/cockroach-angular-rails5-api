(function() {
  
  'use strict';

  angular.module('cockroach', ['ui.router', 'ui.bootstrap', 'ngResource', 'ngDialog', 'ng-token-auth'])

  .constant("baseURL", "http://localhost:3000/api")

  .config(['$authProvider', 'baseURL', function($authProvider, baseURL) {

    $authProvider.configure({ apiUrl: baseURL });

  }]);
  
})();