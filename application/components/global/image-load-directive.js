application.directive('imageLoad', function() {
    return {
        restrict: 'A',
        scope: {
            loadHandler: '&imageLoad' // 'imgLoad'
        },
        link: function (scope, element, attr) {
            element.on('load', scope.loadHandler);
        }
    };
});