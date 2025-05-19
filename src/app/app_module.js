'use strict';

// Angular 모듈 정의
const angular = require('angular');
window.angular = angular; // 전역에 angular 노출
require('angular-resource');
require('@uirouter/angularjs');

const app = angular.module('myApp', [
    'ngResource',
    'ui.router'
]);

// auto_require.js에서 모든 구성요소를 require
require('./app.js');
require('./auto_require.js');

module.exports = app; 