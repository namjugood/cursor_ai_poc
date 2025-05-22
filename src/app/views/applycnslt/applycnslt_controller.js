'use strict';

angular.module('myApp').controller('applycnsltController', __controller);

function __controller($scope, $utilService, $stateParams, $http, $popupService /*$provMangService, $clbcCunsService, $eaiCmnService*/) {
    //## Data Area Start ##//
    $scope.data = {
        /*
        cunlInfo: !$utilService.isEmpty($stateParams.data.micro) ? $stateParams.data.micro.cunlInfo : !$utilService.isEmpty($stateParams.data.cunlInfo) ? $stateParams.data.cunlInfo : null // 상담사 정보 맵핑
        , */
        custNm: null // 고객 이름
        , custPhone1: null // 고객 휴대폰번호1
        , custPhone2: null // 고객 휴대폰번호2
        , custPhone3: null // 고객 휴대폰번호3
        , content: null // 내용
        , remark: null // 상담 내용
        , allProv: false // 약관동의 전체
        , prov1: false // 약관1
        , provDtl: {} // 약관 상세
        /*, ckMainTorqus: !$utilService.isEmpty($stateParams.data.ckMainTorqus) ? $stateParams.data.ckMainTorqus : ''*/ // 상단 메뉴 변경 값
    };
    //## Data Area End ##//

    //## Event Area Start ##//
    $scope.event = {
        init: init() // init
        , evtBtnGoBack: evtBtnGoBack // header 백 버튼
        , evtBtnAllProv: evtBtnAllProv // 전체 약관 동의 버튼
        , evtBtnProv: evtBtnProv // 세부 약관 동의 버튼
        , evtBtnProvDtl: evtBtnProvDtl // 약관 상세 버튼
        , evtBtnClosePopup: evtBtnClosePopup // 약관 상세 팝업 닫기 버튼
        , evtBtnCunsRqus: evtBtnCunsRqus // 상담신청 버튼
        , evtInputKeydown: evtInputKeydown
    };
    //## Event Area End ##//

    //## Vaild Area Start ##//
    $scope.valid = {};
    //## Vaild Area End ##//

    //## View Area Start ##//
    $scope.view = {
        headerTitle: '상담신청',
        footerTitle: '대출 상담신청'
    };

    $scope.title = '상담신청';
    //## View Area End ##//

    //## Init ##//
    function init() {
        console.log('init');
        console.log($scope.view);

        $scope.data.custNm = getParameterByName("custNm");
        $scope.data.custPhone1 = getParameterByName("custPhone1");
        $scope.data.custPhone2 = getParameterByName("custPhone2");
        $scope.data.custPhone3 = getParameterByName("custPhone3");
        if (getParameterByName("prov1") == "Y") {
            $scope.data.allProv = true;
            $scope.data.prov1 = true;
        }

        $utilService.resize();
        //$utilService.scrollTop();
    };

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    //## header 백 버튼 ##//
    function evtBtnGoBack() {
        console.log('evtBtnGoBack');
        $window.history.back();
    };

    //## 전체 약관 동의 버튼 ##//
    function evtBtnAllProv() {
        var data = $scope.data;

        if (data.allProv) {
            data.prov1 = true;
        } else {
            data.prov1 = false;
        }
    };

    //## 세부 약관 동의 버튼 ##//
    function evtBtnProv() {
        var data = $scope.data;

        if (data.prov1) {
            data.allProv = true;
        } else {
            data.allProv = false;
        }
    };

    //## 약관 상세 버튼 ##//
    function evtBtnProvDtl(e) {

        var SMaProv01InSubDto = {
            provDvcd: "90005"
        };

        // $provMangService.selectProvOne(SMaProv01InSubDto).then(function (res) {
        //     cbGetSelectProvOneSuccess(res.SMaProv01OutSubDto, e);
        // }, cbGetSelectProvOneError);

        // 임시코드(약관불러오기)
        $http.get('assets/test/test_data.json').then(function (res) {
            // cbGetSelectProvOneSuccess(res.data, e);
            cbGetSelectProvOneSuccess(res.data.SMaProv01OutSubDto, e);
        });
    };

    //## 약관 조회 성공 ##//
    function cbGetSelectProvOneSuccess(SMaProv01OutSubDto, e) {
        var data = $scope.data;

        data.provDtl = SMaProv01OutSubDto;
        console.log('data.provDtl', data.provDtl.cmnCdNm);

        // 약관 상세 팝업 열기
        $popupService.openModal('app/components/popup/micro/p_micro_prov.tpl.html', $scope, e, 'popup');

        //$utilService.openModal('app/components/popup/micro/p_micro_prov.tpl.html', $scope, e, 'popup');
    }

    //## 약관 조회 네트워크 에러 ##//
    function cbGetSelectProvOneError(err) {
        console.log(err);
    }

    //## 약관 상세 팝업 닫기 버튼 ##//
    function evtBtnClosePopup() {
        console.log('evtBtnClosePopup');
        $popupService.closeModal('popup');
    }

    function evtCheckDevice() {
        var filter = "win16|win32|win64|mac|macintel";

        if (navigator.platform) {
            if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                return "mobile";
            } else {
                return "pc";
            }
        }
    }

    //## 상담신청 버튼 ##//
    function evtBtnCunsRqus() {
        var data = $scope.data;
        var device = evtCheckDevice();

        // 상담 내용 alert 표시
        if (data.remark) {
            alert('입력하신 상담 내용: ' + data.remark);
        }

        /*
        if (device == "mobile") {
            ga('send', 'event', 'M_상담신청', 'CLICK', 'MOBILE');
        }
        if ($utilService.isEmpty(data.cunlInfo)) {
            // 초간편상담 신청
            var SEsnsCunsInDto = {
                custNam: data.custNm,
                mbphTlno: data.custPhone1 + data.custPhone2 + data.custPhone3
            };

            $clbcCunsService.processEsnsCuns(SEsnsCunsInDto).then(cbGetProcessEsnsCunsSuccess, cbGetProcessEsnsCunsError);
        } else {

            
            if (!$utilService.isEmpty(data.cunlInfo.aniFundDt)) {
                var SEsnsCunsInDto = {
                    custNam: data.custNm,
                    mbphTlno: data.custPhone1 + data.custPhone2 + data.custPhone3
                };
                $clbcCunsService.processEsnsCuns(SEsnsCunsInDto).then(cbGetProcessEsnsCunsSuccess, cbGetProcessEsnsCunsError);
            } else {
                // LP상담 신청
                var SHmpgCuwSmsSndnInDto = {
                    custNm: data.custNm,
                    sendPhone: data.custPhone1 + data.custPhone2 + data.custPhone3,
                    tlph: data.cunlInfo.cunlMpno.replaceAll('-', '')
                };
                $eaiCmnService.processHmpgCuwSmsSndn(SHmpgCuwSmsSndnInDto).then(cbGetProcessHmpgCuwSmsSndnSuccess, cbGetProcessHmpgCuwSmsSndnError);
            }
            
        }
        */
    }

    //## LP상담 신청 성공 ##//
    function cbGetProcessHmpgCuwSmsSndnSuccess(res) {
        var data = $scope.data;

        /*
        $utilService.simpleAlert($scope, {
            msgHtml: '대출상담 신청이 완료되었습니다. 메인 화면으로 이동합니다.',
            clickedBt1: function clickedBt1() {
                $utilService.go('micro_main', { id: data.cunlInfo.loanInsiMnno });
            }
        });
        */
    }

    //## LP상담 신청 네트워크 에러 ##//
    function cbGetProcessHmpgCuwSmsSndnError(err) {
        console.log(err);
        $utilService.simpleAlert($scope, '신청이 완료되지 않았습니다. 다시 한번 입력해주세요.');
    }

    //## 초간편상담 신청 성공 ##//
    function cbGetProcessEsnsCunsSuccess(res) {
        var data = $scope.data;

        /*
        $utilService.simpleAlert($scope, {
            msgHtml: '대출상담 신청이 완료되었습니다. 메인 화면으로 이동합니다.',
            clickedBt1: function clickedBt1() {
                if ($utilService.isEmpty(data.cunlInfo)) $utilService.go('ok_main');else $utilService.go('micro_af_main');
            }
        });
        */
    }

    //## 초간편상담 신청 네트워크 에러 ##//
    function cbGetProcessEsnsCunsError(err) {
        console.log(err);
        $utilService.simpleAlert($scope, '신청이 완료되지 않았습니다. 다시 한번 입력해주세요.');
    }

    //## 포커스 이동 ##//
    function evtInputKeydown(model, length, id, e) {
        var view = $scope.view;
        var data = $scope.data;
        console.log('model', model);
        console.log('length', length);
        console.log('id', id);

        try {

            if (id == 'end') {
                if (model.length == length) {
                    e.target.blur();
                    // $utilService.resize();
                    return;
                }
            } else if (id == "custPhone2") {
                if (model == "010" || model == "011" || model == "012" || model == "013" || model == "014" || model == "015" || model == "016" || model == "017" || model == "018" || model == "019" && model.length == length) {

                    // $utilService.moveFocus(model, length, id, e);
                } else if (model.length == length) {
                    data.custPhone1 = String(data.custPhone1).substring(0, 2);
                }
            } else {
                // if (model.length == length) $utilService.moveFocus(model, length, id, e);
            }
        } catch (e) {
            console.log(e);
        }
    }
}
