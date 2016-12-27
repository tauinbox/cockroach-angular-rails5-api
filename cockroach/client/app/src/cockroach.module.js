(function() {
  
  'use strict';

  angular.module('cockroach', ['ui.router', 'ui.bootstrap', 'ngResource', 'ngDialog', 'ng-token-auth'])

  .constant("baseURL", "http://localhost:3000/api")
  // .constant("baseURL", "https://blablablog.herokuapp.com/api")

  .config(['$authProvider', 'baseURL', function($authProvider, baseURL) {

    $authProvider.configure({ 
      apiUrl: baseURL

      // handleLoginResponse: function(response) {
      //   return response;
      // },

      // handleAccountUpdateResponse: function(response) {
      //   return response;
      // },

      // handleTokenValidationResponse: function(response) {
      //   return response;
      // }      
    });

  }])

  // .run(['$rootScope', function ($rootScope) {
  //   console.log('set auth validator');
  //   $rootScope.$on('auth:validation-error', function (ev, error) {
  //     console.log('validation error!', error);
  //   });    
  // }])
  ;
  
})();