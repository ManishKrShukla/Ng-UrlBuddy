'use strict';

/**
 * @ngdoc function
 * @name attndcMgmtApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the attndcMgmtApp
 */
angular.module('attndcMgmtApp').controller('LoginCtrl', ['$q', '$state', '$mdDialog', 'UserService', function($q, $state, $mdDialog, userService) {
    var scope = this;

    scope.userDetails = {
        userName: 'admin',
        password: 'password'
    };

    scope.login = function() {
        scope.loading = true;

        userService.authenticateUser(scope.userDetails).then((response) => {
            scope.loading = false;

            if (response) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Logged In Successfully.')
                    .textContent('Logged In Successfully.')
                    .ok('Continue')).
                then(() => {
                    $state.transitionTo('app.attendance');
                });
            } else {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Login Failed')
                    .textContent('Invalid Username / password. Please try again.')
                    .ok('Continue!')
                );
            }

        });

    }


}]);