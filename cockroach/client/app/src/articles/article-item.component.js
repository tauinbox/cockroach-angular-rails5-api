(function() {

  'use strict';

  angular.module('cockroach')
  .component('articleItem', {
    templateUrl: 'src/articles/article-item.template.html',
    bindings: {
      article: '<',
      currentUserId: '<',
      deleteArticle: '&'
    }
  });

})(); 