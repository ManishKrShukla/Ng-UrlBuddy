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
        'ui.router',
        'ngSanitize',
        'ngMessages'
    ]);

angular.module('attndcMgmtApp').config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default');

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('app', {
            url: "/app",
            templateUrl: 'app-components/routes/users/template.html',
            controller: 'AppCtrl',
            controllerAs: 'appCtrl'
        }).state('login', {
            url: "/",
            templateUrl: 'app-components/routes/login/template.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl'
        }).state('app.attendance', {
            url: "/add",
            templateUrl: 'app-components/routes/users/add-attendance/template.html',
            controller: 'AddCtrl',
            controllerAs: 'addCtrl'
        }).state('app.add-user', {
            url: "/add",
            templateUrl: 'app-components/routes/users/add-user/template.html',
            controller: 'UserCtrl',
            controllerAs: 'userCtrl'
        }).state('app.view', {
            url: "/view",
            templateUrl: 'app-components/routes/users/view/template.html',
            controller: 'ViewCtrl',
            controllerAs: 'viewCtrl'
        }).state('logout', {
            url: "/logout",
            controller: 'LogoutCtrl',
            controllerAs: 'logoutCtrl'
        });
}]);

angular.module('attndcMgmtApp').filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

angular.module('attndcMgmtApp').run(['$rootScope', '$location', function($rootScope, $location) {
    $location.url("/login");
}]);