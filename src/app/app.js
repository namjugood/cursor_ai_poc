'use strict';

angular.module('myApp', [
    'ngResource',
    'ui.router',
    'ui.bootstrap'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/views/home_main.tpl.html',
            controller: 'homeMainController'
        })
        .state('applycnslt', {
            url: '/applycnslt',
            templateUrl: 'app/views/applycnslt/applycnslt.tpl.html',
            controller: 'applycnsltController'
        });
}]); 