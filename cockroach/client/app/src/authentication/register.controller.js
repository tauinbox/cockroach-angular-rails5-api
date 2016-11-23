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

          ngDialog.openConfirm({ 
            template: 'src/authentication/error.template.html',

            // put objects 'title' and 'message' into controller's dialog scope ($scope.ngDialogData)
            data: {
              title: "Registration Unsuccessful",
              message: err.data.errors.join(', ')
            }
          });

        });

      ngDialog.close();
      
    };

  }]);
})();