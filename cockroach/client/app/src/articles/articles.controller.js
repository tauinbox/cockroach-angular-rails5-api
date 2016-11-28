(function() {

  'use strict';

  angular.module('cockroach')
  .controller('ArticlesController', ['$state', '$stateParams', '$auth', 'ngDialog', 'menuItems', 'articlesSvc', function($state, $stateParams, $auth, ngDialog, menuItems, articlesSvc) {

    var artCtrl = this;

    switch ($state.current.name) {
      case 'app.articles':
        articlesSvc.articles.query(
          function (response) {
            artCtrl.articles = response;
          },
          function (error) {
            artCtrl.errMessage = "Error: " + error.status + " " + error.statusText; //not used now
          }
        );          
        break;

      case 'app.articlesNew':
        artCtrl.article = {};
        artCtrl.titleName = 'Create New Article';
        artCtrl.buttonName = 'Post';
        break;

      case 'app.articlesEdit':
        articlesSvc.articles.get({ id: $stateParams.id })
        .$promise.then(
          function(response) {
            artCtrl.article.title = response.title;
            artCtrl.article.content = response.content;
          }, 
          function(error) {
            artCtrl.errMessage = "Error: " + error.status + " " + error.statusText;
          }
        );
        artCtrl.titleName = 'Edit Article';
        artCtrl.buttonName = 'Update';
        break;

      default:
    }

  }]);
})();  