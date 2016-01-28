angular.module("casserole").controller("DeptosAcademicosCtrl", ['$scope', '$meteor', '$state','$stateParams','toastr', function($scope, $meteor, $state, $stateParams, toastr)
{
  $scope.deptosAcademicos = $meteor.collection(DeptosAcademicos).subscribe("deptosAcademicos");
  $scope.action = true;
  $scope.nuevo = true  
	
  $scope.nuevoDeptoAcademico = function()
  {
    $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.deptoAcademico = {};
  };
  
  $scope.guardar = function(deptoAcademico)
	{
		$scope.deptoAcademico.estatus = true;
		$scope.deptosAcademicos.save(deptoAcademico);
		toastr.success('Departamento guardado.');
		$scope.deptoAcademicos = "";
	    $('.collapse').collapse('show');
        $scope.nuevo = true;
	};
	
	$scope.editar = function(id)
	{
    $scope.deptoAcademico = $meteor.object(DeptosAcademicos, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(deptoAcademico)
	{
		$scope.deptoAcademico.save();
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
		
	$scope.cambiarEstatus = function(id)
	{
		var deptoAcademico = $meteor.object(DeptosAcademicos, id, false);
		if(deptoAcademico.estatus == true)
			deptoAcademico.estatus = false;
		else
			deptoAcademico.estatus = true;
		
		deptoAcademico.save();
	};
}]);
	
























