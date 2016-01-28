angular.module("casserole").controller("EscuelaCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
  $scope.escuelas = $meteor.collection(Escuela).subscribe("escuela");
  $scope.action = true;  
  $scope.nuevo = true;
  $scope.nuevoEscuela = function()
  {
    $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.escuela = {}; 
  };
  
 $scope.guardar = function(escuela)
	{
	    $scope.escuela.estatus = true;
		$scope.escuelas.save(escuela);
		toastr.success('Emresa guardada.');
        $scope.escuela = ""; 
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
	
	$scope.editar = function(id)
	{
    $scope.escuela = $meteor.object(Escuelas, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(escuela)
	{
		$scope.escuela.save();
        $('.collapse').collapse('hide');
        $scope.nuevo = true;
	};
		
    $scope.cambiarEstatus = function(id)
	{
		var escuela = $meteor.object(Escuelas, id, false);
		if(escuela.estatus == true)
			escuela.estatus = false;
		else
			escuela.estatus = true;
		
		escuela.save();
	};
}]);
	
	