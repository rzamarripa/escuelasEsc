angular.module("casserole").controller("TitulosCtrl", ['$scope', '$meteor', '$state','$stateParams' , 'toastr', function($scope, $meteor, $state, $stateParams, toastr)
{	
  $scope.titulos = $meteor.collection(Titulos).subscribe("titulos");
  $scope.action = true;  
	$scope.nuevo = true;

  $scope.nuevoTitulo = function()
  {
    $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.titulo = {}; 
	};
  
  $scope.guardar = function(titulo)
	{
		$scope.titulo.estatus = true;
		$scope.titulos.save(titulo);
		toastr.success("Título guardado");
    $scope.titulo = {}; 
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
	
	$scope.editar = function(id)
	{
    $scope.titulo = $meteor.object(Titulos, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(titulo)
	{
		$scope.titulo.save();
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};

	$scope.cambiarEstatus = function(id)
	{
		var titulo = $meteor.object(Titulos, id, false);
		if(titulo.estatus == true)
			titulo.estatus = false;
		else
			titulo.estatus = true;
		
		titulo.save();
    };
		
}]);
	























