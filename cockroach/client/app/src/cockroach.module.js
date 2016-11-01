(function() {
  
  'use strict';

  angular.module('cockroach', ['ui.router', 'ui.bootstrap', 'ngResource', 'ngDialog'])
  .constant("baseURL", "http://localhost:3000/");
  
})();