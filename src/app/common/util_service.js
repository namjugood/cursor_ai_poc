'use strict';

angular.module('myApp').service('$utilService', __service);

function __service($http, $uibModal, $rootScope) {
    var service = this;

    service.isEmpty = isEmpty;
    service.resize = resize;
    service.scrollTop = scrollTop;
    service.simpleAlert = simpleAlert;
    service.go = go;
    service.moveFocus = moveFocus;
    service.openModal = openModal;
    service.closeModal = closeModal;

    function isEmpty(value) {
        return value === null || value === undefined || value === '';
    }

    function resize() {
        // 리사이즈 로직 구현
        console.log('resize called');
    }

    function scrollTop() {
        // 스크롤 탑 로직 구현
        console.log('scrollTop called');
    }

    function simpleAlert(scope, options) {
        // 알림 로직 구현
        console.log('simpleAlert called', options);
    }

    function go(state, params) {
        // 페이지 이동 로직 구현
        console.log('go called', state, params);
    }

    function moveFocus(model, length, id, e) {
        // 포커스 이동 로직 구현
        console.log('moveFocus called', model, length, id);
    }

    function openModal(template, scope, e, modalId) {
        // 모달 열기 로직 구현
        if (!template) {
            console.error('템플릿이 지정되지 않았습니다.');
            return;
        }

        var modalOptions = {
            templateUrl: template,
            scope: scope,
            animation: true,
            backdrop: 'static',
            keyboard: false
        };

        if (modalId) {
            modalOptions.id = modalId;
        }

        if (e && e.preventDefault) {
            e.preventDefault();
        }

        console.log('openModal called', modalOptions.scope);
        return $uibModal.open(modalOptions);
    }

    function closeModal(modalId) {
        // 모달 닫기 로직 구현
        console.log('closeModal called', modalId);
    }
}

module.exports = __service;