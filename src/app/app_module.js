'use strict';

// Angular 모듈 정의
const angular = require('angular');
window.angular = angular; // 전역에 angular 노출
require('angular-route');
require('angular-resource');

const app = angular.module('myApp', [
    'ngRoute',
    'ngResource' // CDN으로 로드된 angular-resource를 모듈 이름으로 직접 참조
]);

// auto_require.js에서 모든 구성요소를 require
require('./app.js');
require('./auto_require.js');


module.exports = app; 