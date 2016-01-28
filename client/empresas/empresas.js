angular.module("casserole").controller("EmpresasCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
  $scope.empresas = $meteor.collection(Empresas).subscribe("empresas");
  $scope.action = true;  
  $scope.nuevo = true;
  $scope.nuevoEmpresa = function()
  {
   $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.empresa = {}; 
  };
  
 $scope.guardar = function(empresa)
	{
	  $scope.empresa.estatus = true;
		$scope.empresas.save(empresa);
		toastr.success('Empresa guardada.');
        $scope.empresa = ""; 
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
	
	$scope.editar = function(id)
	{
    $scope.empresa = $meteor.object(Empresas, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(empresa)
	{
		$scope.empresa.save();
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
		
	$scope.cambiarEstatus = function(id)
	{
		var empresa = $meteor.object(Empresas, id, false);
		if(empresa.estatus == true)
			empresa.estatus = false;
		else
		empresa.estatus = true;
		
		empresa.save();
	};
	   //  $scope.remove = function(empresa)
       // {
       //     $scope.empresa.estatus = false;
       //     $scope.empresas.save(empresa);
       // };
}]);
	
