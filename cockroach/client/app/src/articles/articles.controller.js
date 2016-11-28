(function() {

  'use strict';

  angular.module('cockroach')
  .controller('ArticlesController', ['$state', '$stateParams', '$auth', 'auth', 'ngDialog', 'menuItems', 'articlesSvc', function($state, $stateParams, $auth, auth, ngDialog, menuItems, articlesSvc) {

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
        artCtrl.submitAction = 'create';
        artCtrl.article.user_id = auth.id;
        // console.log(auth);
        break;

      case 'app.articlesEdit':
        articlesSvc.articles.get({ id: $stateParams.id })
        .$promise.then(
          function(response) {
            artCtrl.article = response;
          }, 
          function(error) {
            artCtrl.errMessage = "Error: " + error.status + " " + error.statusText;
          }
        );
        artCtrl.titleName = 'Edit Article';
        artCtrl.buttonName = 'Update';
        artCtrl.submitAction = 'update';
        break;

      case 'app.articlesShow':
        articlesSvc.articles.get({ id: $stateParams.id })
        .$promise.then(
          function(response) {
            artCtrl.article = response;
          }, 
          function(error) {
            artCtrl.errMessage = "Error: " + error.status + " " + error.statusText;
          }
        );
        break;        

      default:
    }

    artCtrl.submitArticle = function(action) {
      // console.log(artCtrl.article);
      switch (action) {
        case 'create':
          // artCtrl.article.user_id = current
          articlesSvc.articles.save(artCtrl.article, function(response) {
            // console.log('Successfully created', response.id);
            $state.go('app.articlesShow', { id: response.id });
          });
          break;
        case 'update':
          articlesSvc.articles.update({id: $stateParams.id}, artCtrl.article, function(response) {
            // console.log('Successfully updated', response.id);
            $state.go('app.articlesShow', { id: response.id });
          });        
          break;
        default:
      }
    };

  }]);
})();  