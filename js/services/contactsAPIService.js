angular.module('listaTelefonica').factory("contactsAPI", function($http) {
  const API_URL = 'https://jsonplaceholder.typicode.com/users';

  const _getContacts = function () {
    return $http.get(API_URL)
  }

  const _addContact = function (contact) {
    return $http.post(API_URL, contact)
  }

  const _deleteContact = function (id) {
    return $http.delete(`${API_URL}/${id}`)
  }

  return {
    getContacts: _getContacts,
    addContact: _addContact,
    deleteContact: _deleteContact
  };
})