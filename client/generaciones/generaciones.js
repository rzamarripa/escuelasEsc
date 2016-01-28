angular.module("casserole").controller("GeneracionesCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
  $scope.generaciones = $meteor.collection(Generaciones).subscribe("generaciones");
  $scope.action = true;  
  $scope.nuevo = true	  
  $scope.nuevoGeneracion = function()
  {
    $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.generacion = {}; 
  };
  
 $scope.guardar = function(generacion)
	{
	    $scope.generacion.estatus = true;
		$scope.generaciones.save(generacion);
		toastr.success('generacion guardada.');
        $scope.generacion = ""; 
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
	
	$scope.editar = function(id)
	{
    $scope.generacion = $meteor.object(Generaciones, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(generacion)
	{
		$scope.generacion.save();
        $('.collapse').collapse('hide');
        $scope.nuevo = true;
	};
		
    $scope.cambiarEstatus = function(id)
	{
		var generacion = $meteor.object(Generaciones, id, false);
		if(generacion.estatus == true)
			generacion.estatus = false;
		else
			generacion.estatus = true;
		
		generacion.save();
	};
}]);
	
	