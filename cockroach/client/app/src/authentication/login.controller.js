(function() {

  'use strict';

  angular.module('cockroach')
  .controller('LoginController', ['$auth', 'ngDialog', 'menuItems', 'popup', function($auth, ngDialog, menuItems, popup) {

    var loginCtrl = this;
      
    loginCtrl.doLogin = function() {
      $auth.submitLogin(loginCtrl.loginData)
      .then(function(resp) {
          // handle success response
          // console.log(resp);
        })
        .catch(function(err) {
          // handle error response
          var msg = err.errors.join(', ');
          popup.displayMessage('Login Unsuccessful', msg);
        });

      ngDialog.close();
      
    };

  }]);
})();  