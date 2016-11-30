(function() {

  'use strict';

  angular.module('cockroach')
  .service('popup', ['ngDialog', function(ngDialog) {
    var popupSrv = this;

    popupSrv.displayMessage = function(header, message) {
      var body =
        '<div class="ngdialog-message">' +
        ' <div><h3>' + header + '</h3></div>' +
        ' <div><p>' + message + '</p></div>' +
        ' <div class="ngdialog-buttons">' +
        '  <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>' +
        ' </div>' +
        '</div>';

      ngDialog.openConfirm({ template: body, plain: true });
    };
      
  }]);
})(); 