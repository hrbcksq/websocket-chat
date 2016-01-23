; {
    (function() {
        var app = angular.module('modal-module', []);

        app.controller("ModalController", ['$scope', function($scope) {
            $scope.showModal = false;
            this.toggleModal = function() {
                $scope.showModal = !$scope.showModal;
            };
        }]);

        app.directive('modalDirective', ['$timeout' ,function($timeout) {
            return {
                scope: true,
                templateUrl: '/partial/modal-template.html',
                restrict: "E",
                link: function postLink(scope, element, attrs) {
                    scope.title = attrs.title;
                    scope.body = attrs.body;
                    scope.footer = attrs.footer;

                    scope.$watch(attrs.visible, function(value) {
                        $timeout(function()
                        {
                        	$(element).modal(value === true ? 'show' : 'hide');
                        });
                    });

                    $(element).on('shown.bs.modal', function() {
                        scope.$apply(function() {
                            scope.$parent[attrs.visible] = true;
                        });
                    });

                    $(element).on('hidden.bs.modal', function() {
                        scope.$apply(function() {
                            scope.$parent[attrs.visible] = false;
                        });
                    });
                }

            };
        }]);
    }());
};
