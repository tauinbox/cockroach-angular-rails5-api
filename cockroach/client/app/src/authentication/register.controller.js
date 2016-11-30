(function() {

  'use strict';

  angular.module('cockroach')
  .controller('RegisterController', ['ngDialog', '$auth', 'menuItems', function(ngDialog, $auth, menuItems) {

    var regCtrl = this;
    
    // Submit registration to the server
    regCtrl.doRegister = function() {
      // console.log('Doing registration', regCtrl.registration);
      $auth.submitRegistration(regCtrl.registration)
      .then(function(resp) {
          // handle success response
          console.log(resp);
        })
        .catch(function(err) {
          // handle error response
          // console.log(err);

          ngDialog.openConfirm({ 
            template: 'src/static_pages/notification.template.html',

            // put objects 'title' and 'message' into controller's dialog scope ($scope.ngDialogData)
            data: {
              title: "Registration Unsuccessful",
              message: err.data.errors.full_messages ? err.data.errors.full_messages.join(', ') : err.data.errors ? err.data.errors.join(', ') : 'Uncaught error'
            }
          });

        });

      ngDialog.close();
      
    };

  }]);
})();