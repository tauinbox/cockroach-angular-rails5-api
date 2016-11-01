(function() {

  'use strict';

  angular.module('cockroach')
  .controller('LoginController', ['$scope', '$auth', 'ngDialog', function($scope, $auth, ngDialog) {

    var loginCtrl = this;
      
    loginCtrl.doLogin = function() {
      $auth.submitLogin(loginCtrl.loginData)
      .then(function(resp) {
          // handle success response
          console.log(resp);
        })
        .catch(function(err) {
          // handle error response
          console.log(err);
        });
        
      ngDialog.close();
    };
            
    loginCtrl.openRegister = function () {
      ngDialog.open({ template: 'src/authentication/register.html', scope: $scope, className: 'ngdialog-theme-default', controller: "RegisterController as regCtrl" });
    };
      
  }]);
})();  