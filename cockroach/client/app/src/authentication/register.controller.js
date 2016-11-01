(function() {

  'use strict';

  angular.module('cockroach')
  .controller('RegisterController', ['ngDialog', '$localStorage', 'authFactory', function(ngDialog, $localStorage, authFactory) {

    var regCtrl = this;
      
    regCtrl.register={};
    regCtrl.loginData={};

    regCtrl.doRegister = function() {
      // console.log('Doing registration', regCtrl.registration);
      authFactory.register(regCtrl.registration);
      ngDialog.close();
    };

  }]);
})();