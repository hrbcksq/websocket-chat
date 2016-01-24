; {
    (function() {
        var app = angular.module('modal-module', []);

        app.factory('modalService', function() {  
        	this.state = false;
            return {
            	'state': this.state,            	
            	'setContent': function(title, body, footer){
        			this.title = title;
        			this.body = body;
        			this.footer = footer;
            	},
                'modal': function() {
                    this.state = !this.state;
                }
            };
        });

        app.directive('modalDirective', ['$timeout', 'modalService', function($timeout, modalService) {
            return {
                scope: true,
                templateUrl: '/partial/modal-template.html',
                restrict: "E",
                link: function postLink(scope, element, attrs) {                    
                    scope.$watch(modalService.state, function(value) {
                        $timeout(function() {
                        	if (value) {
                        		scope.title = modalService.title;
                    			scope.body = modalService.body;
                    			scope.footer = modalService.footer;
                        	};                        	
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
