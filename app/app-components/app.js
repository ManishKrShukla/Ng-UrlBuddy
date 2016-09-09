'use strict';

/**
 * @ngdoc overview
 * @name attndcMgmtApp
 * @description
 * # attndcMgmtApp
 *
 * Main module of the application.
 */
angular
    .module('attndcMgmtApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngMaterial',
        'ngRoute',
        'ngSanitize',
        'ngMessages'
    ]);

angular.module('attndcMgmtApp').config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default');

    $routeProvider
        .when('/main', {
            templateUrl: 'app-components/users/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/', {
            templateUrl: 'app-components/login/login-tpl.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);