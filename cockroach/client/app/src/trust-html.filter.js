(function() {
  'use strict';

  angular.module('cockroach')
  .filter("trustHTML", ['$sce', function($sce) {
    return function(htmlCode){
      return $sce.trustAsHtml(htmlCode);
    };

  }]);

})();    