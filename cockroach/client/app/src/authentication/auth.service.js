(function() {

  'use strict';

  angular.module('iwgApp')

  .factory('authService', ['$resource', '$http', '$rootScope', 'baseURL', 'ngDialog', function($resource, $http, $rootScope, baseURL, ngDialog){
      
    var authSvc = this;
    var isAuthenticated = false;

    authSvc.login = function(loginData) {
        
      $resource(baseURL + "users/sign_in")
        .save(loginData,
          function(response) {
            // console.log(response);
            isAuthenticated = true;
            $rootScope.$broadcast('login:Successful');
          },
          function(response){
            isAuthenticated = false;
            // console.log(response);
            var message =
              '<div class="ngdialog-message">' +
              ' <div><h3>Login Unsuccessful</h3></div>' +
              ' <div><p>' + response.data.err.message + '</p><p>' + response.data.err.name + '</p></div>' +
              ' <div class="ngdialog-buttons">' +
              '  <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>' +
              ' </div>' +
              '</div>';
          
              ngDialog.openConfirm({ template: message, plain: 'true'});
           }
        );
      };
      
      authSvc.logout = function() {
        $resource(baseURL + "users/sign_out").get(function(response) {});
        destroyUserCredentials();
      };
      
      authSvc.register = function(registerData) {
          
        $resource(baseURL + "users")
        .save(registerData,
          function(response) {
            $rootScope.$broadcast('registration:Successful');
          },
          function(response) {
            var message = 
              '<div class="ngdialog-message">' +
              ' <div><h3>Registration Unsuccessful</h3></div>' +
              ' <div><p>' +  response.data.err.message + '</p><p>' + response.data.err.name + '</p></div>' +
              '</div>';
              
              ngDialog.openConfirm({ template: message, plain: 'true'});
          }
        );
      };
      
      authSvc.isAuthenticated = function() {
        return isAuthenticated;
      };
      
  }]);
})();