angular.module("casserole").controller("TiposIngresosCtrl", ['$scope', '$meteor','$stateParams' , '$state', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
	{
	$scope.tiposingresos = $meteor.collection(TiposIngresos).subscribe("tiposingresos");
	$scope.action = true;	
	$scope.nuevo = true;
	
	$scope.nuevoTipoIngresos = function()
	{
	  $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.tipoingreso = {}; 
	};
	
	$scope.guardar = function(tipoingreso)
	{
		$scope.tipoingreso.estatus = true;
		$scope.tiposingresos.save(tipoingreso);
		toastr.success('Ingreso guardado.');
		$scope.tipoingreso = "";
	};
	
	$scope.editar = function(id)
	{
		$scope.tipoingreso = $meteor.object(TiposIngresos, id, false);
		$scope.action = false;
		$('.collapse').collapse('show');
	};
	
	$scope.actualizar = function(tipoingreso)
	{
		$scope.tipoingreso.save();
		$('.collapse').collapse('hide');
	};
	
	$scope.cambiarEstatus = function(id)
	{
		var tipoingreso = $meteor.object(TiposIngresos, id, false);
		if(tipoingreso.estatus == true)
			tipoingreso.estatus = false;
		else
			tipoingreso.estatus = true;
			
		tipoingreso.save();
	};
	
}]);