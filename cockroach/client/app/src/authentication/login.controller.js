(function() {

  'use strict';

  angular.module('cockroach')
  .controller('LoginController', ['ngDialog', 'authService', function(ngDialog, authService) {

    var loginCtrl = this;
      
    loginCtrl.doLogin = function() {
      authService.login(loginCtrl.loginData);
      ngDialog.close();
    };
            
    loginCtrl.openRegister = function () {
      ngDialog.open({ template: 'views/register.html', scope: loginCtrl, className: 'ngdialog-theme-default', controller: "RegisterController" });
    };
      
  }]);
})();  