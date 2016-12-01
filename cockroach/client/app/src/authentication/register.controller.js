(function() {

  'use strict';

  angular.module('cockroach')
  .controller('RegisterController', ['ngDialog', '$auth', '$state', 'menuItems', 'popup', function(ngDialog, $auth, $state, menuItems, popup) {

    var regCtrl = this;
    
    // Submit registration to the server
    regCtrl.doRegister = function() {
      // console.log('Doing registration', regCtrl.registration);
      $auth.submitRegistration(regCtrl.registration)
      .then(function(resp) {
          // handle success response
          // console.log(resp);
          $state.reload();
        })
        .catch(function(err) {
          // handle error response
          popup.displayMessage('Registration Unsuccessful', 
            err.data.errors.full_messages ? err.data.errors.full_messages.join(', ') : err.data.errors ? err.data.errors.join(', ') : 'Uncaught error');
        });

      ngDialog.close();
      
    };

  }]);
})();