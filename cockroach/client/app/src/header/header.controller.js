(function() {
  'use strict';

  angular.module('cockroach')
  .controller('HeaderController', ['$scope', 'authService', 'ngDialog', function($scope, authService, ngDialog) {
    var headCtrl = this;

    headCtrl.openLogin = function() {
      ngDialog.open({ template: 'src/authentication/login.html', scope: $scope, className: 'ngdialog-theme-default', controller: "LoginController as loginCtrl" });
    };

    headCtrl.openRegister = function () {
      ngDialog.open({ template: 'src/authentication/register.html', scope: $scope, className: 'ngdialog-theme-default', controller: "RegisterController as regCtrl" });
    };

  }]);
})();