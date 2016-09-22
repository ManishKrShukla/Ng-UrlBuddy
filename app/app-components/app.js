'use strict';

/**
 * @ngdoc overview
 * @name urlShortnerApp
 * @description
 * # urlShortnerApp
 *
 * Main module of the application.
 */
angular
    .module('urlShortnerApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngMaterial',
        'ngRoute',
        'ui.router',
        'ngSanitize',
        'angular-clipboard',
        'ngMessages'
    ]);

angular.module('urlShortnerApp').config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default');

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('app', {
            url: "/app",
            templateUrl: 'app-components/routes/app/template.html',
            controller: 'AppCtrl',
            controllerAs: 'appCtrl'
        });
}]);

angular.module('urlShortnerApp').filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

angular.module('urlShortnerApp').run(['$rootScope', '$location', function($rootScope, $location) {
    $location.url("/app");
}]);