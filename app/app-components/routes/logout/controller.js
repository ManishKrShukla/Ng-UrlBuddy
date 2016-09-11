'use strict';

/**
 * @ngdoc function
 * @name attndcMgmtApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the attndcMgmtApp
 */
angular.module('attndcMgmtApp')
    .controller('LogoutCtrl', ['$state', 'UserService', function($state, userService) {
        userService.logout();
        $state.transitionTo('login');
    }]);