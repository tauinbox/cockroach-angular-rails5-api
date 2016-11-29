(function() {

  'use strict';

  angular.module('cockroach')
  .component('articleItem', {
    templateUrl: 'src/articles/article-item.template.html',
    controller: 'ArticleItemComponentController',
    bindings: {
      article: '<',
      currentUserId: '<',
      deleteArticle: '&'
    }
  });

})(); 