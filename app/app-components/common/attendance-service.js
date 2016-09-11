'use strict';

/**
 * @ngdoc function
 * @name attndcMgmtApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the attndcMgmtApp
 */
angular.module('attndcMgmtApp').service('AttendanceService', ['$q', 'UserService', function($q, userService) {
    this.attendance = TAFFY([]);

    this.loadAttendanceSheet = function() {
        let attendance = [];
        let filters = { _type: 'attendance' };
        let users = userService.getUserList();
        let dates = [];
        let rows = [];

        if (!userService.isUserAdmin()) {
            filters['userId'] = userService.userLoggedIn.id;
        }

        attendance = this.attendance({ _type: 'attendance' });

        attendance.select('date').forEach((d) => {
            if (dates.indexOf(d.getTime()) === -1) {
                dates.push(d.getTime());
            }
        });

        dates.sort(function(date1, date2) {
            if (date1 > date2) return 1;
            if (date1 < date2) return -1;
            return 0;
        });

        attendance = attendance.get();

        users.forEach((user) => {
            let row = [];

            row.push(user.name);

            dates.forEach((d, index) => {
                dates[index] = new Date(d);

                let record = attendance.find((attd) => {
                    return attd.userId === user.id && attd.date.getTime() === dates[index].getTime();
                });

                if (record) {
                    row.push.apply(row, [record.startTime, record.endTime]);
                } else {
                    row.push.apply(row, ["", ""])
                }

            });

            rows.push(row);
        });

        return {
            dates,
            'rows': rows
        };
    };

    this.createDummyAttendance = function() {
        let users = userService.getUserList();

        users.forEach((user) => {

            var dates = [
                new Date(2016, 12, 12, 12, 0, 0),
                new Date(2016, 12, 13, 12, 0, 0),
                new Date(2016, 12, 14, 12, 0, 0),
                new Date(2016, 12, 15, 12, 0, 0),
                new Date(2016, 12, 16, 12, 0, 0),
            ];

            dates.forEach((date) => {
                this.attendance.insert({
                    date: date,
                    userId: user.id,
                    startTime: date,
                    endTime: new Date(date.getTime() + 7200000), //USing a lame approach, just to quickly populate
                    _type: 'attendance'
                });
            });

        });
    };

    this.addAttendance = function(attendance) {
        let defer = $q.defer();

        let attdnc = Object.assign(attendance, { _type: 'attendance' });

        this.attendance.insert(attdnc);

        $q.delayResolve().then(() => {
            defer.resolve({});
        });

        return defer.promise;
    };

    this.createDummyAttendance();
}]);