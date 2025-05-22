angular.module('myApp').directive('componentsLayoutHeaderDirective', __directive);

function __directive() {
    return {
        replace: true,
        scope: {
            title: '=',
            goBack: '&',
            customClose: '&',
            cancel: '&',
            type: '=',
            searchNo: '=', 
            isFocus: '=',
            search: '=',
            isModal: '=',
            longGds: '='
        },
        transclude: true,
        restrict: 'E',
        templateUrl: 'app/components/layout/header/header.tpl.html',
        link: __link,
        controller: 'headerController'
    };

    function __link($scope, $element, $attrs) {
        $scope.existGoBack = 'goBack' in $attrs;
    }
}