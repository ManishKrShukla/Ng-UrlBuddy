'use strict';

/**
 * @ngdoc function
 * @name attndcMgmtApp.decorator:delayResolve
 * @description
 * # delayResolve
 * Add delayResolve to the $q service.
 */

angular.module('attndcMgmtApp').config(['$provide', '$injector', function($provide, $injector) {

    let injector = angular.injector(['ng']),
        $timeout = injector.get('$timeout');

    $provide.decorator('$q', [
        '$delegate',
        function $qDecorator($delegate) {

            $delegate.map = function(params, callback) {
                let promise = callback.apply(null, convertParam(params[0]));
                let responses = [];

                return params.slice(1).reduce((previousValue, currentValue, currentIndex) => {
                    return previousValue.then((response) => createPromiseWithCB(response, currentValue, callback)());
                }, promise).then((response) => {
                    return new Promise((resolve, reject) => {
                        responses.push(response);
                        resolve(responses);
                    });
                });

                function createPromiseWithCB(response, param, callback) {
                    responses.push(response);
                    return function() {
                        return new Promise((resolve, reject) => {
                            callback.apply(null, convertParam(param)).then((res) => {
                                resolve(res);
                            });
                        });
                    }
                }

                function convertParam(param) {
                    let p = param;

                    if (!(p instanceof Array)) {
                        p = [p];
                    }

                    return p;
                }

            };

            return $delegate;
        }
    ]);

}]);