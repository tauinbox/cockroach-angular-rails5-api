(function() {

  'use strict';

  angular.module('cockroach')
  .controller('RegisterController', ['ngDialog', '$auth', 'menuItems', function(ngDialog, $auth, menuItems) {

    var regCtrl = this;
      
    regCtrl.doRegister = function() {
      // console.log('Doing registration', regCtrl.registration);
      $auth.submitRegistration(regCtrl.registration);
      ngDialog.close();
      menuItems.setActive(menuItems.previousItem);
    };

    // switch to previously chosen menu item
    regCtrl.switchMenuItem = function() {
      // console.log("switch to", menuItems.previousItem);
      menuItems.setActive(menuItems.previousItem);
    };    

  }]);
})();