angular.module('listaTelefonica').directive('uiHeader', function() {
  return {
    templateUrl: 'view/header.html',
    replace: true,
    restrict: 'AE',
    scope: {
      title: "@",
      search: "=",
      show: '&isShow',
      selected: '&isSelected',
      delete: '&onDelete'
    }
  }
})