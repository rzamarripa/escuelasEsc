angular.module("casserole").controller("NacionalidadesCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
  $scope.nacionalidades = $meteor.collection(Nacionalidades).subscribe("nacionalidades");
  $scope.action = true;  
  $scope.nuevo = true;
	
  $scope.nuevoNacionalidad = function()
  {
   $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.nacionalidad = {}; 
  };
  
   $scope.guardar = function(nacionalidad)
	{
		$scope.nacionalidad.estatus = true;
		$scope.nacionalidades.save(nacionalidad);
		toastr.success('Nacionalidad guardado.');
		$('.collapse').collapse('hide');
		$scope.nuevo = true;	
	};
	
	$scope.editar = function(id)
	{
    $scope.nacionalidad = $meteor.object(Nacionalidades, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(nacionalidad)
	{
		$scope.nacionalidad.save();
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
		
	$scope.cambiarEstatus = function(id)
	{
		var nacionalidad = $meteor.object(Nacionalidades, id, false);
		if(nacionalidad.estatus == true)
			nacionalidad.estatus = false;
		else
			nacionalidad.estatus = true;
		
		nacionalidad.save();
	};
}]);
































