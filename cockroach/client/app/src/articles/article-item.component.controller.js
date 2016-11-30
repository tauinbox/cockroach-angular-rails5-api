(function() {

  'use strict';

  angular.module('cockroach')
  .controller('ArticleItemComponentController', ['$element', '$rootScope', function($element, $rootScope) {
    var $ctrl = this;
    $ctrl.deleteId = null;

    $ctrl.$onInit = function() {
      // console.log('Initialized');
      // console.log($element);
    };

    $ctrl.deleteItem = function(identifier) {
      $ctrl.deleteId = identifier;

      // call referenced function to delete article
      $ctrl.deleteArticle({ id: identifier });
    };

    // set listener on Article deletion event
    var articleDeletionListener = $rootScope.$on('article:item-deleted', function(event, data) {
      // console.log(data);

      // if it's deleted instance then remove it from DOM
      if (data.id === $ctrl.deleteId) {
        $element.remove();
        $ctrl.deleteId = null;
      }
    });

    $ctrl.$onDestroy = function () {
      // console.log('controller instance has been destroyed', $ctrl);
      articleDeletionListener();
    };    

      
  }]);
})(); 