(function() {

  'use strict';

  angular.module('cockroach')
  .controller('ArticlesController', [
    '$rootScope', '$state', '$stateParams', '$auth', 'auth', 'ngDialog', 'menuItems', 'articlesSvc', 'popup', 'articlesData', 'articleData', 'profileSvc', 'profileData', 'currentUserDispName',
    function($rootScope, $state, $stateParams, $auth, auth, ngDialog, menuItems, articlesSvc, popup, articlesData, articleData, profileSvc, profileData, currentUserDispName) {

    var artCtrl = this;

    // set current_user_id if authorized
    if (auth.id) {
      artCtrl.current_user_id = auth.id;
      artCtrl.current_user_email = auth.email;
      artCtrl.current_user_profile = profileData;
      artCtrl.current_user_display_name = currentUserDispName;
    }

    // detect actions
    switch ($state.current.name) {

      // index action
      case 'app.articles':
        // ===============================================
        // REFACTORED! Move all get-data logic to resolve object

        // articlesSvc.articles.query(
        //   function (response) {
        //     // Success callback is called with value (Object|Array)
        //     artCtrl.articles = response;
        //   },
        //   function (error) {
        //     // The error callback is called with (httpResponse) argument
        //     popup.displayMessage("Can't get articles data", (error.statusText.length > 0) ? "Status (" + error.status + "). " + error.statusText : 'request was aborted');
        //   }
        // );
        artCtrl.articles = articlesData;  
        break;

      // create new article action
      case 'app.articlesNew':
        artCtrl.article = {};
        artCtrl.titleName = 'Create New Article';
        artCtrl.buttonName = 'Post';
        artCtrl.submitAction = 'create';
        artCtrl.article.user_id = artCtrl.current_user_id;
        // console.log(auth);
        break;

      // edit article action
      case 'app.articlesEdit':
        // articlesSvc.articles.get({ id: $stateParams.id })
        // .$promise.then(
        //   function(response) {
        //     // set article object
        //     artCtrl.article = response;
        //   }, 
        //   function(error) {
        //     artCtrl.errMessage = "Error: " + error.status + " " + error.statusText;
        //     console.log(artCtrl.errMessage);
        //   }
        // );
        artCtrl.article = articleData;
        artCtrl.titleName = 'Edit Article';
        artCtrl.buttonName = 'Update';
        artCtrl.submitAction = 'update';
        break;

      // show article action
      case 'app.articlesShow':
        // articlesSvc.articles.get({ id: $stateParams.id })
        // .$promise.then(
        //   function(response) {
        //     // set article object
        //     artCtrl.article = response;
        //   }, 
        //   function(error) {
        //     artCtrl.errMessage = "Error: " + error.status + " " + error.statusText;
        //     console.log(artCtrl.errMessage);
        //   }
        // );
        artCtrl.article = articleData;
        break;        

      default:
    }

    // submit article function
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

    // delete article function
    artCtrl.deleteArticle = function(articleId) {
      articlesSvc.articles.delete({ id: articleId })
      .$promise.then(
        function(response) {
          // broadcast an event with deleted id if succeeded
          $rootScope.$broadcast('article:item-deleted', {id: articleId});
          if ($state.current.name === 'app.articlesShow') {
            $state.go('app.articles');
          }
        }, 
        function(error) {
          artCtrl.errMessage = "Error: " + error.status + " " + error.statusText;
          console.log(artCtrl.errMessage);
        }
      );      
    };

    artCtrl.submitComment = function() {
      articlesSvc.comments.save({ id: $stateParams.id }, { body: artCtrl.mycomment })
      .$promise.then(function() {
        $state.go($state.current, {}, {reload: true});
      });      
    };

  }]);
})();  