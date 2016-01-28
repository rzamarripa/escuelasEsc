angular.module("casserole").controller("CiclosCtrl", ['$scope', '$meteor', '$state', '$stateParams','toastr',  function($scope, $meteor, $state, $stateParams, toastr)
{	
  $scope.ciclos = $meteor.collection(Ciclos).subscribe("ciclos");
  $scope.action = true;  
  	  
  $scope.nuevo = true;	  
  $scope.nuevoCiclo = function()
  {
     $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.ciclo = {};
    /*
    $scope.ciclo.anioEscolar = 2016;
    $scope.ciclo.complementoEscolar = 21;
    //$scope.ciclo.descripcion = "prueba";
    $scope.ciclo.anioAdministrativo = 2016;
    $scope.ciclo.complementoAdministrativo = 20;
    $scope.ciclo.fechaInicio = new Date();
    $scope.ciclo.fechaFin = new Date();
    $scope.ciclo.fechaBase = new Date();
    */

  };
$scope.submit = function(){
		$scope.submitted=true;
		$scope.ciclo.estatus = true;
		console.log($scope.validForm);
		if($scope.validForm == true){
			$scope.guardar($scope.materia)
		}
	}
  $scope.guardar = function(ciclo)
	{
		
		console.log($scope.ciclo);
		$scope.ciclos.save(ciclo);
		toastr.success('Ciclo guardado.');
		$scope.ciclo = {};
		$('.collapse').collapse('show');
		$scope.nuevo = true;
		state.go('root.ciclos');
	};
	
	$scope.editar = function(id)
	{
    $scope.ciclo = $meteor.object(Ciclos, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;

	};
	
	$scope.actualizar = function(ciclo)
	{
		$scope.ciclo.save();
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
		
	$scope.cambiarEstatus = function(id)
	{
		var ciclo = $meteor.object(Ciclos, id, false);
		if(ciclo.estatus == true)
			ciclo.estatus = false;
		else
			ciclo.estatus = true;
		
		ciclo.save();
	};
	
}]);
