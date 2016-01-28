angular.module("casserole").controller("AulasCtrl" , ['$scope', '$meteor', '$state','$stateParams', 'toastr',  function($scope, $meteor, $state, $stateParams, toastr) 
{
  $scope.aulas = $meteor.collection(Aulas).subscribe("aulas");
  $scope.secciones = $meteor.collection(Secciones).subscribe("secciones");
  
  $scope.action = true;  
  $scope.nuevo = true;
  
  $scope.nuevoAula = function()
  {
    $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.aula = {}; 
 
  };
  
 $scope.guardar = function(aula)
	{
	    $scope.aula.estatus = true;
		$scope.aulas.save(aula);
		toastr.success('Aula guardada.');
        $scope.aula = ""; 
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
	
	$scope.editar = function(id)
	{
    $scope.aula = $meteor.object(Aulas, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(aula)
	{
		$scope.aula.save();
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
		
	$scope.cambiarEstatus = function(id)
	{
		var aula = $meteor.object(Aulas, id, false);
		if(aula.estatus == true)
			aula.estatus = false;
		else
		aula.estatus = true;
		
		aula.save();
	};
	   //  $scope.remove = function(empresa)
       // {
       //     $scope.empresa.estatus = false;
       //     $scope.empresas.save(empresa);
       // };
}]);
	
