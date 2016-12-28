(function() {
  'use strict';

  angular.module('cockroach')
  .controller('HomeController', ['$location', '$state', 'menuItems', function($location, $state, menuItems) {

    var homeCtrl = this;

    var redirect_params = $location.search();

    // check for redirection parameter received from rails server
    if (redirect_params.hasOwnProperty('goto')) {
      // console.log(redirect_params.goto);

      // get an array of states
      var states = $state.get();

      // split received url string
      var url_to_check = redirect_params.goto.split('/');

      // we'll store there state's url for checking out
      var target_state_url;

      // we'll put there the name of appropriate state to go
      var state_to_go;

      // loop through all states to find appropriate one
      for (var i=0; i < states.length; i++) {
        target_state_url = states[i].url.split('/');
        if (url_to_check.length === target_state_url.length && url_to_check[0] === target_state_url[0]) {
          state_to_go = states[i].name;
          break;
        }
      }

      // check if we found one to go
      if (state_to_go) {
        // if url doesn't contain any parameters
        if (!url_to_check[1]) {
          $state.go(state_to_go);
        } else {
          var param = {};
          // set param's property previously removing ':' symbol from string
          param[target_state_url[1].replace(':', '')] = url_to_check[1];
          // go to the state with given param object         
          $state.go(state_to_go, param);
        }

      } else {
        // otherwise go to home state
        $state.go('app');
      }

    }

  }]);
})();