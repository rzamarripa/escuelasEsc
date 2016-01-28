angular.module("casserole").controller("OcupacionesCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
	
	$scope.ocupaciones = $meteor.collection(Ocupaciones).subscribe("ocupaciones");
	$scope.action = true;
	$scope.nuevo = true;
	$scope.nuevaOcupacion = function()
	{
	  $scope.action = true;
      $scope.nuevo = !$scope.nuevo;
      $scope.ocupacion = {}; 
	};
	
	$scope.guardar = function(ocupacion)
	{
		$scope.ocupacion.estatus = true;
		$scope.ocupaciones.save(ocupacion);
		toastr.success('Ocupacion guardado.');
		$scope.ocupacion = "";
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
	
	$scope.editar = function(id)
	{
		$scope.ocupacion = $meteor.object(Ocupaciones, id, false);
		$scope.action = false;
		$('.collapse').collapse('show');
		$scope.nuevo = false;
	};
	
	$scope.actualizar = function(ocupacion)
	{
		$scope.ocupacion.save();
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
	
	$scope.cambiarEstatus = function(id)
	{
		var ocupacion = $meteor.object(Ocupaciones, id, false);
		if(ocupacion.estatus == true)
			ocupacion.estatus = false;
		else
			ocupacion.estatus = true;
			
		ocupacion.save();
	};
	
}]);