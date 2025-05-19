'use strict';

angular.module('myApp', [
    'ngRoute',
    'ngResource'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home_main.tpl.html',
            controller: 'homeMainController'
        })
        .when('/applycnslt', {
            templateUrl: 'app/views/applycnslt/applycnslt.tpl.html',
            controller: 'applycnsltController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]); 