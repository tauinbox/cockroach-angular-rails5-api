(function() {

  'use strict';

  angular.module('cockroach')
  .controller('ProfileController', ['$rootScope', '$state', 'profileSvc', 'auth', function($rootScope, $state, profileSvc, auth) {
    var profileCtrl = this;

    // set current_user_id if authorized
    if (auth.id) {
      profileCtrl.current_user_id = auth.id;
      profileCtrl.user_email = auth.email;
    }

    // detect actions
    switch ($state.current.name) {

      // show profile action
      case 'app.profile':
        profileSvc.profile.get({ user_id: profileCtrl.current_user_id })
        .$promise.then(
          function(response) {
            // set profile object
            profileCtrl.profile = response;

            // set header
            // priority: nickname -> firstname + lastname -> firstname -> lastname -> email
            profileCtrl.header = (profileCtrl.profile.nickname ? profileCtrl.profile.nickname : 
              profileCtrl.profile.firstname ? profileCtrl.profile.lastname ? profileCtrl.profile.firstname + ' ' + profileCtrl.profile.lastname : profileCtrl.profile.firstname : 
              profileCtrl.profile.lastname ? profileCtrl.profile.lastname : profileCtrl.user_email);

            if (!profileCtrl.profile.nickname && !profileCtrl.profile.firstname && !profileCtrl.profile.lastname && !profileCtrl.profile.status && !profileCtrl.profile.userpic) {
              // go to Edit form when Profile is empty
              $state.go('app.profileEdit', { user_id:  profileCtrl.current_user_id });
            }
          }, 
          function(error) {
            profileCtrl.errMessage = "Error: " + error.status + " " + error.statusText;
            console.log(profileCtrl.errMessage);
          }
        );
        break;      

      // edit profile action
      case 'app.profileEdit':
        profileSvc.profile.get({ user_id: profileCtrl.current_user_id })
        .$promise.then(
          function(response) {
            // set profile object
            profileCtrl.profile = response;

            // set header
            // priority: nickname -> firstname + lastname -> firstname -> lastname -> email
            profileCtrl.header = (profileCtrl.profile.nickname ? profileCtrl.profile.nickname : 
              profileCtrl.profile.firstname ? profileCtrl.profile.lastname ? profileCtrl.profile.firstname + ' ' + profileCtrl.profile.lastname : profileCtrl.profile.firstname : 
              profileCtrl.profile.lastname ? profileCtrl.profile.lastname : profileCtrl.user_email);         
          }, 
          function(error) {
            profileCtrl.errMessage = "Error: " + error.status + " " + error.statusText;
            console.log(profileCtrl.errMessage);
          }
        );
        break;

      default:
    }

    profileCtrl.submitProfile = function() {
      profileSvc.profile.update({ user_id: profileCtrl.current_user_id }, profileCtrl.profile, function(response) {
        $state.go('app.profile');
      }); 
    };
      
  }]);
})(); 