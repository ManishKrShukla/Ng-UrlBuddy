'use strict';

/**
 * @ngdoc function
 * @name urlShortnerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the urlShortnerApp
 */
angular.module('urlShortnerApp').service('HttpService', ['$q', '$http', function($q, $http) {

    this.makeHttpCall = function(request) {
        var deferred = $q.defer();

        $http({
            url: request.url,
            method: request.method,
            data : request.body
        }).then(function(response) {
            deferred.resolve(response.data);
        }, function(error) {
            // Here we can show some generic dialog boxes based on the error recieved and then send it across.
            deferred.reject(error);
        });

        return deferred.promise;
    };

}]);