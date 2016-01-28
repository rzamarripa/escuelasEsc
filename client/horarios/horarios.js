angular.module("casserole").controller("HorariosCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
	$scope.horarios = $meteor.collection(function(){return Horarios.find();}).subscribe("horarios");
	
}]);