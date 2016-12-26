(function() {

  'use strict';

  angular.module('cockroach')
  .service('articlesSvc', ['$resource', 'baseURL', function($resource, baseURL) {

    var articlesSrv = this;

    articlesSrv.articles = $resource(baseURL + "/articles/:id", null, {
      'update': {
        method: 'PUT'
      }
    });

    articlesSrv.comments = $resource(baseURL + "/articles/:id/comments/:commentId", null, {
      'update': {
        method: 'PUT'
      }
    });

    // // used for resolve in routes.js
    // articlesSrv.getArticles = function() {
    //   return articlesSrv.articles.query().$promise;
    // };    
      
  }]);
    
})(); 