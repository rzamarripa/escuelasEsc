angular.module("casserole").controller("DocumentosCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
  $scope.documentos = $meteor.collection(Documentos).subscribe("documentos");
  $scope.action = true;  
  $scope.nuevo = true;

  $scope.nuevoDocumento = function()
  {
    $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.documento = {}; 
  };
  

 $scope.guardar = function(documento)
	{
	
	    $scope.documento.estatus = true;
		$scope.documentos.save(documento);
		toastr.success('Documento guardado.');
        $scope.documento = {}; 
		$('.collapse').collapse('hide');
        $scope.nuevo = true;
	};
	
	$scope.editar = function(id)
	{
    $scope.documento = $meteor.object(Documentos, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(documento)
	{
		$scope.documento.save();
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
		
	$scope.cambiarEstatus = function(id)
	{
		var documento = $meteor.object(Documentos, id, false);
		if(documento.estatus == true)
			documento.estatus = false;
		else
		documento.estatus = true;
		
		documento.save();
	};

}]);
	
