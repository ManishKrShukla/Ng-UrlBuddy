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

            $delegate.reduce = function(params, callback, initialValue) {
                let promise = callback.apply(null, convertParam(params[0], initialValue));

                return params.slice(1).reduce((previousValue, currentValue, currentIndex) => {
                    return previousValue.then(createPromiseWithCB(currentValue, callback));
                }, promise);

                function createPromiseWithCB(param, callback) {
                    return function(response) {
                        return new Promise((resolve, reject) => {
                            callback.apply(null, convertParam(param, response)).then((res) => {
                                resolve(res);
                            });
                        });
                    }
                }

                function convertParam(param, value) {
                    let p = param;

                    if (!(p instanceof Array)) {
                        p = [p];
                    }

                    p.push(value);
                    return p;
                }

            };

            return $delegate;
        }
    ]);

}]);