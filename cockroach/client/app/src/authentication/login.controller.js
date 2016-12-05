(function() {

  'use strict';

  angular.module('cockroach')
  .controller('LoginController', ['$auth', '$state', 'ngDialog', 'menuItems', 'popup', function($auth, $state, ngDialog, menuItems, popup) {

    var loginCtrl = this;
      
    loginCtrl.doLogin = function() {
      $auth.submitLogin(loginCtrl.loginData)
      .then(function(resp) {
          // handle success response
          // console.log(resp);
          $state.reload();
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