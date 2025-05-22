'use strict';

angular.module('myApp').service('$popupService', __service);

function __service($http, $uibModal, $rootScope, $ionicModal, $timeout) {
    var popupModal;
    var modal = [];
    var ev = [];
    var popupBackButton = [];
    return {
        openModal: openModal,
        closeModal: closeModal,
    }

    function openModal(url, scope, e, modalId) {
        console.log('openModal', scope);

        $timeout(function() {
            if($rootScope.isOpenModal == true) {
                var popup = $ionicModal.fromTemplateUrl(url, {
                    scope: scope,
                }).then(function(modalPopup) {
                    modal.push(modalPopup);
                    e && ev.push(e);
                    console.log('modalPopup', modal[modal.length - 1]);
                    modal[modal.length - 1].show();

                    angular.element('.textfield input').bind('focus', function(event) {
                        if(event.currentTarget.attributes.hasOwnProperty('readonly') &&
                            (!event.currentTarget.attributes.readonly.value == 'input-security-key')) {
                                event.currentTarget.blur();
                        }else {
                            event.currentTarget.parentNode.parentNode.classList.add('textfield---focus');
                            event.currentTarget.parentNode.parentNode.classList.add('textfield---fill');
                        }
                    });

                    angular.element('.textfield input').bind('blur', function(event) {
                        event.currentTarget.parentNode.parentNode.classList.remove('textfield---focus');
                        var value = event.currentTarget.value;
                        if(value.length === 0) {
                            event.currentTarget.parentNode.parentNode.classList.remove('textfield---fill');
                        }
                    });

                    angular.element('.accordion--toggle').bind('click', function(event) {
                        if(event.currentTarget.parentNode.classList.indexOf('accordion---active') > -1) {
                            event.currentTarget.parentNode.classList.remove('accordion---active');
                        }else {
                            event.currentTarget.parentNode.classList.add('accordion---active');
                        }
                        //$viewService.resize();
                    });

                    $(document).trigger({type: 'state.change'});
                });
            }
        });
    }

    function closeModal() {
        var modalPopup = modal[modal.length - 1];
        if(modalPopup) {       
            modalPopup.hide();
            modalPopup.remove();
            modal.pop();
        }
    }
}   
module.exports = __service;