angular.module("casserole").controller("MateriasCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
	$scope.materias = $meteor.collection(Materias).subscribe("materias");
	$scope.deptosAcademicos = $meteor.collection(function(){return DeptosAcademicos.find();}).subscribe("deptosAcademicos");
    $scope.action = true; 
    $scope.nuevo = true; 
    

  $scope.nuevaMateria = function()
  {
   	$scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.materia = {};
    
  };
  $scope.submit = function(){
  		console.log("entro al submit");
  		$scope.submitted=true;
  		console.log($scope.validForm);
  		if($scope.validForm)
  			$scope.guardar($scope.materia)

  		
  	
  }
  
  $scope.guardar = function(materia)
	{
		$scope.materia.estatus = true;
		$scope.materias.save(materia);
		toastr.success('Materia guardada.');
		$scope.materia = {};
		$('.collapse').collapse('hide');
		$scope.nuevo = true;

	};
	
	$scope.editar = function(id)
	{
    $scope.materia = $meteor.object(Materias, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(materia)
	{
		$scope.materia.save();
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
		
	$scope.cambiarEstatus = function(id)
	{
		var materia = $meteor.object(Materias, id, false);
		if(materia.estatus == true)
			materia.estatus = false;
		else
			materia.estatus = true;
		
		materia.save();
	};
	
	$scope.getDeptoAcademico = function(depto_id){
		var depto = $meteor.object(DeptosAcademicos, depto_id, false);
		return depto.descripcion;		
	};
	
}]);