angular.module('listaTelefonica').factory("contactsAPI", function($http, config) {
  const _getContacts = function () {
    return $http.get(config.baseUrl)
  }

  const _addContact = function (contact) {
    return $http.post(config.baseUrl, contact)
  }

  const _deleteContact = function (id) {
    return $http.delete(`${config.baseUrl}/${id}`)
  }

  return {
    getContacts: _getContacts,
    addContact: _addContact,
    deleteContact: _deleteContact
  };
})