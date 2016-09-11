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

            $delegate.filter = function(promises, callback) {
                let promise = promises[0];
                let responses = [];

                return promises.slice(1).reduce((previousValue, currentValue, currentIndex) => {
                    return previousValue.then((response) => createPromiseWithCB(response, currentValue));
                }, promise).then((response) => {
                    var defer = $delegate.defer();
                    let vals = [];

                    responses.push(response);

                    responses.forEach((val, index) => {

                        callback.call(null, index).then((shouldAdd) => {
                            if (shouldAdd) {
                                vals.push(val);
                            }

                            if (index === responses.length - 1) {
                                defer.resolve(vals);
                            }
                        });

                    });


                    return defer.promise;
                });

                function createPromiseWithCB(response, param) {
                    responses.push(response);
                    return param;
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