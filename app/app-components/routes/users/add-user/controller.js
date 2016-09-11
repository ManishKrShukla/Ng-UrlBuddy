'use strict';

/**
 * @ngdoc function
 * @name attndcMgmtApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the attndcMgmtApp
 */
angular.module('attndcMgmtApp')
    .controller('UserCtrl', ['$state', '$mdDialog', 'AttendanceService', 'UserService', function($state, $mdDialog, attendanceService, userService) {
        let scope = this;
        scope.isAdmin = userService.isUserAdmin();
        scope.loading = false;

        scope.userTypes = [
            'admin',
            'user'
        ];

        scope.resetUser = function() {
            scope.userList = userService.getUserList(true);

            scope.userDetails = {
                'userName': '',
                'password': '',
                'group': 'user'
            };
        };

        if (!scope.isAdmin) {
            $state.transitionTo('app.attendance');
        }

        scope.addUser = function() {
            scope.loading = true;

            userService.addUser(scope.userDetails).then((response) => {
                scope.loading = false;

                if (response) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Success.')
                        .textContent('User Added Successfully.')
                        .ok('Continue')).
                    then(() => {
                        scope.resetUser();
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
        };

        scope.resetUser();

    }]);