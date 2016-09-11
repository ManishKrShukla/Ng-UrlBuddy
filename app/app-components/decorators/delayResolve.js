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

            $delegate.delayResolve = function() {
                let deferred = $delegate.defer();

                $timeout(() => {
                    deferred.resolve({});
                }, 2000);

                return deferred.promise;
            };

            return $delegate;
        }
    ]);

}]);