angular.module("casserole").controller("MaestrosCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
  $scope.maestros = $meteor.collection(Maestros).subscribe("maestros");
  $scope.action = true;
  $scope.nuevo = true;
  	  
  $scope.nuevoMaestro = function()
  {
    $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.maestro = {}; 
  };

	$scope.guardar = function(maestro)
	{
		$scope.maestro.estatus = true;
		$scope.maestros.save(maestro);
		Meteor.call('createUsuario', maestro, 'maestro');
		toastr.success("Maestro Creado \n Usuario Creado");

    $scope.maestro = {}; 
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
	
	$scope.editar = function(id)
	{
    $scope.maestro = $meteor.object(Maestros, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(maestro)
	{
		$scope.maestro.save();
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
		
	$scope.cambiarEstatus = function(id)
	{
		var maestro = $meteor.object(Maestros, id, false);
		if(maestro.estatus == true){
			maestro.estatus = false;
			toastr.error("Se Desactivó el maestro");
		}			
		else{
			toastr.success("Se Activó el maestro");
			maestro.estatus = true;
		}

		
		maestro.save();
	};

	$scope.tomarFoto = function(){
		$meteor.getPicture().then(function(data){
			$scope.maestro.fotografia = data;
		});
	};
	
}]);



