angular.module('myApp').controller('headerController', __controller);

function __controller($scope, $element, $attrs, $popupService, $stateParams, $rootScope) {
    $scope.data = {
        title: '',
        unregisterBackButton: null
    };

    $scope.event = {
        init: init,
        closeModal: closeModal,
        customClose: customClose
    };

    $scope.view = $scope.view || {};

    function closeModal() {
        $popupService.closeModal('popup');
    }

    function customClose() {
        if($scope.customClose) {
            $scope.customClose();
        }
    }

    function init() {
        console.log('headerController');
        console.log($scope.view);
    }

    init();

    $scope.$on('$destroy', function() {
        $scope.data = null;
        $scope.event = null;
    });

    $scope.$on('$stateChangeStart', function() {
        $scope.data = null;
        $scope.event = null;
    }); 

}