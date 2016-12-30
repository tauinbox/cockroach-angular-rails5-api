(function() {

  'use strict';

  angular.module('cockroach')
  .controller('ArticleItemComponentController', ['$element', '$rootScope', function($element, $rootScope) {
    var $ctrl = this;
    $ctrl.deleteId = null;

    // $ctrl.$onInit = function() {
    //   console.log('Initialized');
    // };

    // $ctrl.$postLink = function() {
    //   var content = $element.find('.trix-wrapper');
    //   console.log(content[0].innerText);
    // };

    $ctrl.$doCheck = function() {
      var content = $element.find('.trix-wrapper');
      // check if component template is loaded
      if (content[0].innerText.length > 0) {
        // console.log($element.find('.trix-wrapper')[0].innerText);

        content.trunk8({
          lines: 5,
          tooltip: false
          // fill: '&hellip;', /*(Default: '&hellip;') The string to insert in place of the omitted text. This value may include HTML.*/
          // //side: 'right', /*(Default: 'right') The side of the text from which to truncate. Valid values include 'center', 'left', and 'right'.*/
          // //onTruncate /*(Callback): Called after truncation is completed.*/
        });
      }
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