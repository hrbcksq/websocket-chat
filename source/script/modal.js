; {
    (function() {
        var app = angular.module('modal-module', []);
        app.controller("ModalController",[function() {            
            this.showModal = false;
            this.toggleModal = function() {
                this.showModal = !this.showModal;
            };
        }]);

        app.directive('modalDirective', function() {
            return {
                scope: {
                    'title': "=title",
                    'body': '=body',
                    'footer': '=footer'
                },
                templateUrl: '/partial/modal-template.html',
                restrict: "E",
                link: function postLink(scope, element, attrs) {
                    scope.$watch(attrs.visible, function(value) {
                        $(element).modal(value === true ? 'show' : 'hide');
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
        });
    }());
};
