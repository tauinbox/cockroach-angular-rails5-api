(function() {

  'use strict';

  angular.module('cockroach')
  .controller('LoginController', ['$scope', 'ngDialog', 'authService', function($scope, ngDialog, authService) {

    var loginCtrl = this;
      
    loginCtrl.doLogin = function() {
      authService.login(loginCtrl.loginData);
      ngDialog.close();
    };
            
    loginCtrl.openRegister = function () {
      ngDialog.open({ template: 'src/authentication/register.html', scope: $scope, className: 'ngdialog-theme-default', controller: "RegisterController as regCtrl" });
    };
      
  }]);
})();  