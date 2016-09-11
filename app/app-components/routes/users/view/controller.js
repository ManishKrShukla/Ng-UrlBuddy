'use strict';

/**
 * @ngdoc function
 * @name attndcMgmtApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the attndcMgmtApp
 */
angular.module('attndcMgmtApp')
    .controller('ViewCtrl', ['$mdSidenav', '$mdDialog', 'AttendanceService', 'UserService', function($mdSidenav, $mdDialog, attendanceService, userService) {
        let scope = this;
        scope.isAdmin = userService.isUserAdmin();

        scope.loadAttendance = function() {
            let response = {};
            response = attendanceService.loadAttendanceSheet();

            scope.attendanceSheet = response;

            scope.attendanceSheet.startEndStub = _.times(response.dates.length * 2, function(index) {
                return (index + 1) % 2 === 0 ? 'End' : 'Start';
            });
        };

        scope.loadAttendance();
    }]);