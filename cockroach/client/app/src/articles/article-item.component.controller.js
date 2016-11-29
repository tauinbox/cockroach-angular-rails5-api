(function() {

  'use strict';

  angular.module('cockroach')
  .controller('ArticleItemComponentController', ['$element', function($element) {
    var $ctrl = this;

    $ctrl.$onInit = function() {
      // console.log('Initialized');
      // console.log($element);
    };

    $ctrl.deleteItem = function(identifier) {
      $ctrl.deleteArticle({ id: identifier });
      $element.remove();
    };

      
  }]);
})(); 