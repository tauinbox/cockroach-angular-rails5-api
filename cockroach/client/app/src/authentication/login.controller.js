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

          // console.log(err.errors);

          ngDialog.openConfirm({ 
            template: 'src/static_pages/notification.template.html',

            // put objects 'title' and 'message' into controller's dialog scope ($scope.ngDialogData)
            data: {
              title: "Login Unsuccessful",
              message: err.errors.join(', ')
            }
          });

        });

      ngDialog.close();
      
    };

  }]);
})();  