'use strict';

/**
 * @ngdoc function
 * @name attndcMgmtApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the attndcMgmtApp
 */
angular.module('attndcMgmtApp').service('UserService', ['$q', function($q) {
    this.users = TAFFY([
        { "id": 1, _type: 'user', group: 'admin', "userName": "manish", password: "5f4dcc3b5aa765d61d8327deb882cf99" },
        { "id": 2, _type: 'user', group: 'admin', "userName": "admin", password: "5f4dcc3b5aa765d61d8327deb882cf99" },
        { "id": 3, _type: 'user', group: 'user', "userName": "User1", password: "5f4dcc3b5aa765d61d8327deb882cf99" },
        { "id": 4, _type: 'user', group: 'user', "userName": "User2", password: "5f4dcc3b5aa765d61d8327deb882cf99" },
        { "id": 5, _type: 'user', group: 'user', "userName": "User3", password: "5f4dcc3b5aa765d61d8327deb882cf99" },
        { "id": 6, _type: 'user', group: 'user', "userName": "User4", password: "5f4dcc3b5aa765d61d8327deb882cf99" },
        { "id": 7, _type: 'user', group: 'user', "userName": "User5", password: "5f4dcc3b5aa765d61d8327deb882cf99" },
    ]);

    this.isUserAdmin = function() {
        return this.userLoggedIn.group === "admin";
    };

    this.addUser = function(user) {
        let defer = $q.defer();
        let hashedPassword = (new Hashes.MD5).hex(user.password);
        let userDetails = null;
        Object.assign(user, { 'password': hashedPassword, id: new Date().getTime(), _type: 'user' });
        userDetails = this.users.insert(user);

        console.log(this.users().get());

        $q.delayResolve().then(() => {
            defer.resolve(userDetails);
        });

        return defer.promise;
    };

    this.logout = function() {
        this.userLoggedIn = {};
    };

    this.getUserList = function(sendGroup = false) {
        var filters = { group: 'user' };
        var selectList = ["id", "userName"];

        if (sendGroup) {
            selectList.push("group");
        }

        if (this.userLoggedIn.group !== "admin") {
            filters['id'] = this.userLoggedIn.id;
        }

        let users = this.users(filters).select(...selectList);

        if (users) {
            let usersDetails = [];

            users.forEach((user) => {
                usersDetails.push({
                    id: user[0],
                    name: user[1],
                    group: user[2]
                });
            });

            return usersDetails;
        }


        return [];
    };

    this.authenticateUser = function(user) {
        let defer = $q.defer();
        let hashedPassword = (new Hashes.MD5).hex(user.password);
        let userDetails = this.users({ _type: 'user', userName: user.userName, password: hashedPassword }).first();

        if (userDetails) {
            this.userLoggedIn = userDetails;
        }

        $q.delayResolve().then(() => {
            defer.resolve(userDetails);
        });

        return defer.promise;
    };
}]);