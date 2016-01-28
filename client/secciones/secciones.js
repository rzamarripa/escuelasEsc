angular.module("casserole").controller("SeccionesCtrl", ['$scope', '$meteor', '$state', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
  $scope.secciones = $meteor.collection(Secciones).subscribe("secciones");
  $scope.deptosAcademicos = $meteor.collection(function(){return DeptosAcademicos.find();}).subscribe("deptosAcademicos");
  $scope.turnos = $meteor.collection(function(){return Turnos.find();}).subscribe("turnos");
  $scope.campuss = $meteor.collection(function(){return Campus.find();}).subscribe("campus");
  $scope.action = true;  
  $scope.nuevo = true;  

 
 $scope.getDeptoAcademico = function(id)
  { 
  	var depto = $meteor.object(DeptosAcademicos, id, false);
  	return depto.descripcionCorta; 
  }; 
  
	$scope.getCampus = function(id)
  { 
  	var campus = $meteor.object(Campus, id, false);
  	return campus.nombre; 
  }; 
	
  $scope.nuevoSeccion = function()
  {
     $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.seccion = {}; 
  };
  
  $scope.guardar = function(seccion)
	{
		$scope.seccion.estatus = true;
		$scope.secciones.save(seccion);
		toastr.success('Seccion guardada.');
		$('.collapse').collapse('hide');
		$scope.nuevo = true;		
	};
	
	$scope.editar = function(id)
	{
    $scope.seccion = $meteor.object(Secciones, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(seccion)
	{
		$scope.seccion.save();
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};

	$scope.cambiarEstatus = function(id)
	{
		var seccion = $meteor.object(Secciones, id, false);
		if(seccion.estatus == true)
			seccion.estatus = false;
		else
			seccion.estatus = true;
		
		seccion.save();
    };
		
}]);