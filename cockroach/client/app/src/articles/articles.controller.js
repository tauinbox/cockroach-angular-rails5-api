(function() {

  'use strict';

  angular.module('cockroach')
  .controller('ArticlesController', ['$auth', 'ngDialog', 'menuItems', 'articles', function($auth, ngDialog, menuItems, articles) {

    var artCtrl = this;

    artCtrl.articles = articles;

  }]);
})();  