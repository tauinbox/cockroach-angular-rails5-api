(function() {

  'use strict';

  angular.module('cockroach')
  .controller('LoginController', ['ngDialog', '$localStorage', 'authFactory', function(ngDialog, $localStorage, authFactory) {

    var loginCtrl = this;
      
    loginCtrl.loginData = $localStorage.getObject('userinfo','{}');

    loginCtrl.doLogin = function() {
      if (loginCtrl.rememberMe) $localStorage.storeObject('userinfo', loginCtrl.loginData);
      authFactory.login(loginCtrl.loginData);
      ngDialog.close();
    };
            
    loginCtrl.openRegister = function () {
      ngDialog.open({ template: 'views/register.html', scope: loginCtrl, className: 'ngdialog-theme-default', controller: "RegisterController" });
    };
      
  }]);
})();  