(function() {

  'use strict';

  angular.module('cockroach')
  .service('menuItems', ['$rootScope', '$state', function($rootScope, $state) {
    var menuItemsSrv = this;

    // menu items list
    menuItemsSrv.itemsList = ['home', 'articles', 'about', 'profile', 'login', 'logout', 'register'];

    // set activeMenu to active state
    menuItemsSrv.activeMenu = ($state.current.url == '/') ? menuItemsSrv.itemsList[0] : $state.current.url;
    menuItemsSrv.previousItem = menuItemsSrv.itemsList[0];

    // set active menu item and broadcast an event
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