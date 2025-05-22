'use strict';

angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    'ionic'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        // 추상 레이아웃 상태 (컨트롤러 없음)
        .state('base', {
            abstract: true,
            templateUrl: 'app/components/layout/base.tpl.html'
        })
        // 홈 화면
        .state('home', {
            url: '/',
            templateUrl: 'app/views/home_main.tpl.html',
            controller: 'homeMainController'
        })
        // 상담신청 화면
        .state('applycnslt', {
            url: '/applycnslt',
            templateUrl: 'app/views/applycnslt/applycnslt.tpl.html',
            controller: 'applycnsltController'
        });
}])
//
.run(['$rootScope', function($rootScope) {
    $rootScope.isOpenModal = true;
}]); 