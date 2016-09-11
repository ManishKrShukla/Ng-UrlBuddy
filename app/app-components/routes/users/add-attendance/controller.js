'use strict';

/**
 * @ngdoc function
 * @name attndcMgmtApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the attndcMgmtApp
 */
angular.module('attndcMgmtApp')
    .controller('AddCtrl', ['$mdSidenav', '$mdDialog', 'AttendanceService', 'UserService', function($mdSidenav, $mdDialog, attendanceService, userService) {
        let scope = this;
        scope.isAdmin = userService.isUserAdmin();
        scope.loading = false;

        if (scope.isAdmin) {
            scope.users = userService.getUserList();
        }

        scope.resetAttendance = function() {
            scope.attndcDetails = {
                date: new Date(),
                userId: '',
                startTime: '',
                endTime: ''
            }
        };

        scope.addAttndc = function() {
            if (scope.isAdmin && !scope.attndcDetails.userId) {
                alert("You must select a user to continue");
            }

            if (!scope.isAdmin) {
                scope.attndcDetails.userId = userService.userLoggedIn.id;
            }

            scope.loading = true;

            attendanceService.addAttendance(scope.attndcDetails).then(() => {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Success.')
                    .textContent('Attendance Saved Successfully.')
                    .ok('Continue')).
                then(() => {
                    scope.loading = false;
                    // scope.resetAttendance();
                    // $state.transitionTo('app.add');
                });
            });
        };

        scope.resetAttendance();
    }]);