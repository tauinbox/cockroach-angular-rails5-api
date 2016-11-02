(function() {

  'use strict';

  angular.module('cockroach')
  .controller('LoginController', ['$auth', 'ngDialog', 'menuItems', function($auth, ngDialog, menuItems) {

    var loginCtrl = this;
      
    loginCtrl.doLogin = function() {
      $auth.submitLogin(loginCtrl.loginData)
      .then(function(resp) {
          // handle success response
          // console.log(resp);
        })
        .catch(function(err) {
          // handle error response
          console.log(err);
        });

      ngDialog.close();
      menuItems.setActive(menuItems.previousItem);
    };

    // switch to previously chosen menu item
    loginCtrl.switchMenuItem = function() {
      // console.log("switch to", menuItems.previousItem);
      menuItems.setActive(menuItems.previousItem);
    };
            
  }]);
})();  