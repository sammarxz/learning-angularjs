angular.module('listaTelefonica').controller('listaTelefonicaCtrl', function ($scope, $http) {
  const API_URL = 'https://jsonplaceholder.typicode.com/users';

  $scope.title = 'Lista Telefônica';
  $scope.showForm = false;

  const loadContacts = function () {
    $http({
      method: 'GET',
      url: API_URL
    }).then(function (response){
      if (response.status === 200) {
        $scope.contacts = response.data
      }
    }, function (error){
      console.error(error);
    });
  }

  $scope.setShowForm = function () {
    $scope.showForm = !$scope.showForm;
  }

  $scope.addContact = function (keyEvent, contact) {
    if (keyEvent.which === 13) {
      $http.post(API_URL, contact)
      .then(function(response) {
        delete $scope.contact;
        $scope.showForm = false;
        $scope.contacts.push(angular.copy(response.data));
      })
      .catch(error => {
        console.error(error)
      })
    }
  }

  $scope.removeContact = function (contacts) {
    const selectedContacts = contacts.filter(function (contact) {
      if (contact.selected) return contact;
    });
    selectedContacts.map(function(contact) {
      $http.delete(`${API_URL}/${contact.id}`).then(function (response) {
        if (response.status === 200) {
          $scope.contacts = contacts.filter(function (contact) {
            if (!contact.selected) return contact;
          });
        }
      }, function (response) {
        console.error('error', response);
      });
    })
  }

  $scope.isSelected = function (contacts) {
    return contacts.some(function (contact) {
      return contact.selected;
    });
  }

  $scope.orderBy = function(type) {
    $scope.direction = !$scope.direction
    $scope.order = type
  }

  loadContacts()
})