(function() {

  'use strict';

  angular.module('cockroach')
  .controller('RegisterController', ['ngDialog', 'authService', function(ngDialog, authService) {

    var regCtrl = this;
      
    regCtrl.doRegister = function() {
      // console.log('Doing registration', regCtrl.registration);
      authService.register(regCtrl.registration);
      ngDialog.close();
    };

  }]);
})();