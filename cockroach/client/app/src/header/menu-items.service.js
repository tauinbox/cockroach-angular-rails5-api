(function() {

  'use strict';

  angular.module('cockroach')
  .service('menuItems', ['$rootScope', function($rootScope) {
    var menuItemsSrv = this;

    menuItemsSrv.activeMenu = 'home';
    menuItemsSrv.previousItem = 'home';

    menuItemsSrv.setActive = function(menu) {
      if (menu !== menuItemsSrv.activeMenu) {
        menuItemsSrv.previousItem = menuItemsSrv.activeMenu;
        console.log("copy previous menu item:");
        console.log(menuItemsSrv.previousItem);
      }
      menuItemsSrv.activeMenu = menu;
      $rootScope.$broadcast('menu:item-changed');
      console.log("Set item to", menu);
    };
      
  }]);
})(); 