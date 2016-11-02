(function() {
  'use strict';

  angular.module('cockroach')
  .controller('HeaderController', ['$scope', '$rootScope', '$auth', 'ngDialog', 'menuItems', function($scope, $rootScope, $auth, ngDialog, menuItems) {
    var headCtrl = this;

    headCtrl.loggedIn = false;

    headCtrl.activeMenu = menuItems.activeMenu;

    headCtrl.openLogin = function() {
      ngDialog.open({ 
        template: 'src/authentication/login.html', 
        scope: $scope, 
        className: 'ngdialog-theme-default', 
        controller: "LoginController as loginCtrl", 
        showClose: false,
        closeByEscape: false 
      });

    };

    headCtrl.openRegister = function () {
      ngDialog.open({ 
        template: 'src/authentication/register.html', 
        scope: $scope, 
        className: 'ngdialog-theme-default', 
        controller: "RegisterController as regCtrl", 
        showClose: false,
        closeByEscape: false
      });

    };

    headCtrl.logOut = function() {
      $auth.signOut()
      .then(function(resp) {
        // handle success response
        headCtrl.loggedIn = false;
        console.log("Successfully signed out");

        // switch to home menu item after logging out
        menuItems.setActive('home');
      })
      .catch(function(resp) {
        // handle error response
      });
    };

    headCtrl.setActive = function(menu) {
      menuItems.setActive(menu);
    };

    var loginSuccessListener = $rootScope.$on('auth:login-success', function() {
      headCtrl.loggedIn = true;
    });

    var menuItemsListener = $rootScope.$on('menu:item-changed', function() {
      headCtrl.activeMenu = menuItems.activeMenu;
    });    

    headCtrl.$onDestroy = function () {
      console.log("Unregistering auth:login-success listener");
      loginSuccessListener();
      menuItemsListener();
    };

  }]);
})();