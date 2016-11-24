(function() {

  'use strict';

  angular.module('cockroach')
  .service('ArticlesService', ['$resource', 'baseURL', function($resource, baseURL) {

    var articlesSrv = this;

    articlesSrv.articles = $resource(baseURL + "/articles", null, {
      'update': {
        method: 'PUT'
      }
    });

    // used for resolve in routes.js
    articlesSrv.getArticles = function() {
      return articlesSrv.articles.query().$promise;
    };    
      
  }]);
    
})(); 