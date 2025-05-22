angular.module('myApp').controller('footerController', __controller);

function __controller($scope, $timeout, $rootScope) {
    $scope.data = {};

    $scope.event = {};

    $scope.view = {
        isShowing: true,
        isFirstAdbrix: $scope.firstAdbrix ? true : false,
        isSecondAdbrix: $scope.secondAdbrix ? true : false
    };

    $rootScope.isShowing = true;

    function keyboardShowHandler(e) {
        var view = $scope.view;
        $rootScope.isShowing = false;
        $rootScope.keyboardHeight = e.keyboardHeight;

        $timeout(function() {
            view.isShowing = $rootScope.isShowing;
        }, 50);
    }

    function keyboardHideHandler() {
        var view = $scope.view;
        $rootScope.isShowing = true;
        
        view.isShowing = true;
        $timeout(function() {
            view.isShowing = $rootScope.isShowing;
        }, 50);
    }

    $scope.$on('rootScope:broadcast', function(event, data){
        var view = $scope.view;
        $timeout(function() {
            view.isShowing = data;
        }, 50);
    }) 

}