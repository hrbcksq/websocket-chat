;{
	(function(){
		var app = angular.module('modal-module',[]);
		app.controller("main", function($scope){
			$scope.title = 'title';
			$scope.body = 'body';
			$scope.footer = 'footer';
			$scope.showModal = false;
			$scope.toggleModal = function(){
				$scope.showModal = !$scopte.showModal;
			};
		});

		app.directive('modalDirective', function(){
			return {				
				transclude: {
					'title': "?panelTitle",
					'body': 'panelBody',
					'footer': '?panelFooter'
				},
				templateUrl: '/partial/modal-template.html',
				restrict: "E"
			};
		});
	}())
}