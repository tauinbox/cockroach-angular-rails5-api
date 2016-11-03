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
      
      // switch to previously chosen menu item
      // menuItems.setActive(menuItems.previousItem);
    };

    // switch to previously chosen menu item
    // loginCtrl.switchMenuItem = function() {
    //   menuItems.setActive(menuItems.previousItem);
    // };
            
  }]);
})();  