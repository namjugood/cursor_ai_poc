angular.module('myApp').directive('componentsLayoutFooterDirective', __directive);

function __directive() {
    return {
        replace: false,
        scope: {
            title: '=',
            subTitle: '=',
            firstDisable: '=',
            inputComplete: '=',
            type: '=',
            firstAdbrix: '=',
            secondAdbrix: '=',
            firstButton: '&',
            secondButton: '&'
        },
        transclude: true,
        restrict: 'E',
        templateUrl: 'app/components/layout/footer/footer.tpl.html',
        link: __link,
        controller: 'footerController'
    };

    function __link($scope, $element, $attrs) {
        console.log($scope.firstDisable);
    }
}