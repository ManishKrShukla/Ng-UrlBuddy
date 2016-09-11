'use strict';

/**
 * @ngdoc function
 * @name attndcMgmtApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the attndcMgmtApp
 */
angular.module('attndcMgmtApp')
    .controller('AppCtrl', ['$mdSidenav', 'UserService', '$q', '$timeout', function($mdSidenav, userService, $q, $timeout) {
        this.isAdmin = userService.isUserAdmin();

        // $q.map([4000, 3000, 2000, 1000], function(param) {
        //     var defer = $q.defer();

        //     $timeout(() => {
        //         console.log("Done with param --> ", param);
        //         defer.resolve(param);
        //     }, param);

        //     return defer.promise;
        // }).then(function(response) {
        //     console.log(response);
        // });

        // var promises = [4001, 3000, 2001, 1000].map(function(param) {
        //     var defer = $q.defer();

        //     $timeout(() => {
        //         defer.resolve(param);
        //     }, param);

        //     return defer.promise;
        // });

        // $q.filter(promises, function(val) {
        //     var defer = $q.defer();

        //     $timeout(() => {
        //         defer.resolve(val % 2 === 0);
        //     });

        //     return defer.promise;
        // }).then(function(response) {
        //     console.log(response);
        // });

        // $q.reduce([4000, 3000, 2000, 1000], function(param, returnValue) {
        //     var defer = $q.defer();

        //     $timeout(() => {
        //         console.log("Done with param --> ", param);
        //         defer.resolve(param + returnValue);
        //     }, param);

        //     return defer.promise;
        // }, 0).then(function(response) {
        //     console.log(response);
        // });


        this.toggleLeft = function() {
            $mdSidenav('left')
                .toggle();
        };
    }]);