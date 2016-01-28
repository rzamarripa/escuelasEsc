angular.module("casserole").controller("TurnosCtrl",   ['$scope', '$meteor', '$state','$stateParams', 'toastr', function($scope, $meteor, $state, $stateParams, toastr)
{	
	
  $scope.turnos = $meteor.collection(Turnos).subscribe("turnos");
  $scope.action = true;
  $scope.nuevo = true;  
  	  
  $scope.nuevoTurno = function()
  {
     $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.turno = {}; 
  };
  
  $scope.guardar = function(turno)
	{
		$scope.turno.estatus = true;
		$scope.turnos.save(turno);
		toastr.success('Turno guardado.');
        $scope.turno = ""; 
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
	
	$scope.editar = function(id)
	{
    $scope.turno = $meteor.object(Turnos, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(turno)
	{
		$scope.turno.save();
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};

	$scope.cambiarEstatus = function(id)
	{
		var turno = $meteor.object(Turnos, id, false);
		if(turno.estatus == true)
			turno.estatus = false;
		else
			turno.estatus = true;
		
		turno.save();
    };
		
}]);

	























