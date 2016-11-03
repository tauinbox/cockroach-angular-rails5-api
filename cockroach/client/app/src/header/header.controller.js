(function() {
  'use strict';

  angular.module('cockroach')
  .controller('HeaderController', ['$scope', '$rootScope', '$auth', 'ngDialog', 'menuItems', function($scope, $rootScope, $auth, ngDialog, menuItems) {
    var headCtrl = this;

    headCtrl.loggedIn = false;

    headCtrl.activeMenu = menuItems.activeMenu;

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
        console.log(resp.data);

        // switch to home menu item after logging out
        menuItems.setActive('home');
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
    var loginSuccessListener = $rootScope.$on('auth:login-success', function() {
      headCtrl.loggedIn = true;
    });

    // Listener for menu items change event
    var menuItemsListener = $rootScope.$on('menu:item-changed', function() {
      headCtrl.activeMenu = menuItems.activeMenu;
      // console.log("Active menu was set to", headCtrl.activeMenu);
    });    

    // Clean up all listeners on destroy
    headCtrl.$onDestroy = function () {
      console.log("Unregistering auth:login-success listener");
      loginSuccessListener();
      menuItemsListener();
    };

  }]);
})();