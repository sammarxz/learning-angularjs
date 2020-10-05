angular.module('listaTelefonica').controller('listaTelefonicaCtrl', function ($scope, contactsAPI) {
  $scope.showForm = false;

  const loadContacts = function () {
    contactsAPI.getContacts().then(function (response){
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
      contactsAPI.addContact(contact)
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
      contactsAPI.deleteContact(contact.id).then(function (response) {
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