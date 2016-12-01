(function() {

  'use strict';

  angular.module('cockroach')
  .service('profileSvc', ['$resource', 'baseURL', function($resource, baseURL) {

    var profileSrv = this;

    profileSrv.profile = $resource(baseURL + "/users/:user_id/profile", null, {
      'update': {
        method: 'PUT'
      }
    });

  }]);
    
})(); 