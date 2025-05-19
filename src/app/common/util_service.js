'use strict';

angular.module('myApp').service('utilService', __service);

function __service() {
    var service = this;

    service.isEmpty = isEmpty;

    function isEmpty(value) {
        return value === null || value === undefined || value === '';
    }
}