(function() {
  'use strict';

  angular.module('cockroach')
  .controller('HeaderController', ['$scope', '$rootScope', '$auth', 'auth', '$state', 'ngDialog', 'menuItems', function($scope, $rootScope, $auth, auth, $state, ngDialog, menuItems) {
    var headCtrl = this;

    headCtrl.activeMenu = menuItems.activeMenu;
    headCtrl.itemsList = menuItems.itemsList;

    // check if user is authenticated by checking resolved auth property
    if (auth.id) {
      headCtrl.loggedIn = true;
    } else {
      headCtrl.loggedIn = false;
    }

    // open Login dialog
    headCtrl.openLogin = function() {
      ngDialog.open({ 
        template: 'src/authentication/login.template.html', 
        scope: $scope, 
        className: 'ngdialog-theme-default', 
        controller: "LoginController as loginCtrl", 
        showClose: false,
        // closeByEscape: false,
        preCloseCallback: function() {
          menuItems.setActive(menuItems.previousItem);
          return true;
        }        
      });
    };

    // open Registration dialog
    headCtrl.openRegister = function () {
      ngDialog.open({ 
        template: 'src/authentication/register.template.html', 
        scope: $scope, 
        className: 'ngdialog-theme-default', 
        controller: "RegisterController as regCtrl", 
        showClose: false,
        // closeByEscape: false,
        preCloseCallback: function() {
          menuItems.setActive(menuItems.previousItem);
          return true;
        }
      });
    };

    // Logout function
    headCtrl.logOut = function() {
      $auth.signOut()
      .then(function(resp) {
        // handle success response
        headCtrl.loggedIn = false;
        // console.log(resp.data);
        $state.go('app');
      })
      .catch(function(err) {
        // handle error response
      });
    };

    // Set active menu item
    headCtrl.setActive = function(menu) {
      menuItems.setActive(menu);
    };

    // Listener for succesful login event
    var loginSuccessListener = $rootScope.$on('auth:login-success', function(event, user) {
      // console.log(user);
      headCtrl.loggedIn = true;
    });

    // Listener for menu items change event
    var menuItemsListener = $rootScope.$on('menu:item-changed', function() {
      headCtrl.activeMenu = menuItems.activeMenu;
      // console.log("Active menu was set to", headCtrl.activeMenu);
    });

    // Listener for successful state change event
    var stateChangeListener = $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

      // chek for changed state url if it's one of menu items
      var stateItem = (toState.url == '/') ? menuItems.itemsList[0] : toState.url;

      // if it's true than highlight new item
      if (menuItems.itemsList.indexOf(stateItem) !== -1) {
        menuItems.setActive(stateItem);
      }
      // console.log(stateItem);
    });

    var authenticateListener = $rootScope.$on('header:do-authenticate', function() {
      headCtrl.setActive(headCtrl.itemsList[4]);
      headCtrl.openLogin();
    });

    // Clean up all listeners on destroy
    headCtrl.$onDestroy = function () {
      console.log("Unregistering auth:login-success listener");
      loginSuccessListener();
      menuItemsListener();
      stateChangeListener();
      authenticateListener();
    };

  }]);
})();