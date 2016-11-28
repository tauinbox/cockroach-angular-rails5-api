(function() {
  'use strict';

  angular.module('cockroach')
  .controller('HomeController', ['$location', '$state', 'menuItems', function($location, $state, menuItems) {

    var homeCtrl = this;

    var redirect_params = $location.search();

    // check for redirection parameter received from rails server
    if (redirect_params.hasOwnProperty('goto')) {
      // console.log(redirect_params.goto);

      if ($state.get('app.' + redirect_params.goto)) {
        // if it's some of our states, then set it to active
        $state.go('app.' + redirect_params.goto);
      } else {
        // otherwise go to home state
        $state.go('app');
      }
    }

  }]);
})();