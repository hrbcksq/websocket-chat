;{
	function(){
		var app = angular.module('modal-module',[]);
		app.controller("main", function($scope){
			$scope.showModal = false;
			$scope.toggleModal = function(){
				$scope.showModal = !$scopte.showModal;
			};
		});

		app.directive('modal', function(){
			return {
				template: 
			}
		});
	}
}