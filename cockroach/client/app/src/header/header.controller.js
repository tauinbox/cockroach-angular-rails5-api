(function() {
  'use strict';

  angular.module('cockroach')
  .controller('HeaderController', ['$scope', '$rootScope', '$auth', 'ngDialog', function($scope, $rootScope, $auth, ngDialog) {
    var headCtrl = this;

    headCtrl.loggedIn = false;

    headCtrl.openLogin = function() {
      ngDialog.open({ template: 'src/authentication/login.html', scope: $scope, className: 'ngdialog-theme-default', controller: "LoginController as loginCtrl" });
    };

    headCtrl.openRegister = function () {
      ngDialog.open({ template: 'src/authentication/register.html', scope: $scope, className: 'ngdialog-theme-default', controller: "RegisterController as regCtrl" });
    };

    headCtrl.logOut = function() {
      $auth.signOut()
      .then(function(resp) {
        // handle success response
        headCtrl.loggedIn = false;
        console.log("Successfully signed out");
      })
      .catch(function(resp) {
        // handle error response
      });
    };

    var loginSuccessListener = $rootScope.$on('auth:login-success', function() {
      headCtrl.loggedIn = true;
    });

    headCtrl.$onDestroy = function () {
      console.log("Unregistering auth:login-success listener");
      loginSuccessListener();
    };

  }]);
})();