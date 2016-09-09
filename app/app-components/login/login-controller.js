'use strict';

/**
 * @ngdoc function
 * @name attndcMgmtApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the attndcMgmtApp
 */
angular.module('attndcMgmtApp').controller('LoginCtrl', ['$q', 'UserService', function($q, userService) {
    var scope = this;
    scope.userDetails = {
        userName: '',
        password: ''
    };

    scope.login = function() {
        $q.delayResolve().then(() => {
            console.log(this);
        });
    }


}]);