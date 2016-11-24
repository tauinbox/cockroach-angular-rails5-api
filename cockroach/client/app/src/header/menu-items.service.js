(function() {

  'use strict';

  angular.module('cockroach')
  .service('menuItems', ['$rootScope', '$state', function($rootScope, $state) {
    var menuItemsSrv = this;

    // set activeMenu to active state
    menuItemsSrv.activeMenu = ($state.current.url == '/') ? 'home' : $state.current.url;
    menuItemsSrv.previousItem = 'home';

    menuItemsSrv.setActive = function(menu) {
      if (menu !== menuItemsSrv.activeMenu) {
        menuItemsSrv.previousItem = menuItemsSrv.activeMenu;
      }
      menuItemsSrv.activeMenu = menu;
      $rootScope.$broadcast('menu:item-changed');
      // console.log("Set item to " + menu + ". Previous value:", menuItemsSrv.previousItem);
    };
      
  }]);
})(); 