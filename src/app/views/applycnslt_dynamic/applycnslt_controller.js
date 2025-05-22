'use strict';

angular.module('myApp').controller('applycnsltController', __controller);

function __controller($scope, $window) {
    // 데이터 바인딩 객체
    $scope.data = {
        custNm: '',
        custPhone1: '',
        custPhone2: '',
        custPhone3: '',
        allProv: false,
        prov1: false
    };

    // 이벤트 바인딩 객체
    $scope.event = {
        evtBtnGoBack: evtBtnGoBack,
        evtBtnAllProv: evtBtnAllProv,
        evtBtnProv: evtBtnProv,
        evtBtnProvDtl: evtBtnProvDtl,
        evtBtnCunsRqus: evtBtnCunsRqus,
        evtInputKeydown: evtInputKeydown
    };

    function evtBtnGoBack() {
        $window.history.back();
    }

    function evtBtnAllProv() {
        $scope.data.prov1 = $scope.data.allProv;
    }

    function evtBtnProv() {
        $scope.data.allProv = $scope.data.prov1;
    }

    function evtBtnProvDtl(e) {
        alert('약관 상세보기는 실제 서비스에서 구현됩니다.');
    }

    function evtBtnCunsRqus() {
        if ($scope.data.custNm && $scope.data.custPhone1 && $scope.data.custPhone2 && $scope.data.custPhone3 && $scope.data.prov1) {
            alert('상담 신청이 완료되었습니다!');
        }
    }

    function evtInputKeydown(model, length, id, e) {
        if (model && model.length >= length) {
            if (id !== 'end') {
                var next = document.getElementById(id);
                if (next) next.focus();
            }
        }
    }
}
