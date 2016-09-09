'use strict';

/**
 * @ngdoc function
 * @name attndcMgmtApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the attndcMgmtApp
 */
angular.module('attndcMgmtApp').service('UserService', function() {
    this.users = TAFFY([
        { "id": 1, _type: 'user', "userName": "manish", password: "5f4dcc3b5aa765d61d8327deb882cf99" },
        { "id": 2, _type: 'user', "userName": "admin", password: "5f4dcc3b5aa765d61d8327deb882cf99" }
    ]);

    this.authenticateUser = function(user) {

    };
});