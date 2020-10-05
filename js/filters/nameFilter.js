angular.module('listaTelefonica').filter('name', function() {
  return function(input) {
    const nameList = input.split(' ');
    const formatedNameList = nameList.map(function(name) {
      return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    })

    return formatedNameList.join(' ');
  }
})