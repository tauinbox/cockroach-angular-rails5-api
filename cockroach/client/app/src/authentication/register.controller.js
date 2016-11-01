(function() {

  'use strict';

  angular.module('cockroach')
  .controller('RegisterController', ['ngDialog', '$auth', function(ngDialog, $auth) {

    var regCtrl = this;
      
    regCtrl.doRegister = function() {
      // console.log('Doing registration', regCtrl.registration);
      $auth.submitRegistration(regCtrl.registration);
      ngDialog.close();
    };

  }]);
})();