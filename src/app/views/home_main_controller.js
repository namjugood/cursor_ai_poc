'use strict';

angular.module('myApp').controller('homeMainController', __controller);

// Controller constructor function
function __controller($scope, $location) {
    // data definition area
    $scope.data = {
        title: '오케이 캐피탈 프로젝트',
        message: 'Cursor AI를 이용한 웹 프로젝트'
    };

    // view definition area
    $scope.view = {
        btnNm: '상담신청',
        viewName: 'home'
    };

    // validations definition area
    $scope.valid = {
        isValid: true
    };

    // events injection
    $scope.event = {
        init: init,
        goApplyCnslt: goApplyCnslt
    };

    function init() {
        // Initiation function
        console.log('Home controller initialized');
    }

    function goApplyCnslt() {
        // Go to applycnslt page
        console.log('Go to applycnslt page');
        $location.path('/applycnslt');
    }
} 

//module.exports = __controller;