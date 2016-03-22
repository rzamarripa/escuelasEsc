angular.module("casserole").controller("TrabajadoresCtrl", ['$scope', '$meteor', '$state', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
  $scope.trabajadores = $meteor.collection(Trabajadores).subscribe("trabajadores");
  $scope.deptosAcademicos = $meteor.collection(function(){return DeptosAcademicos.find();}).subscribe("deptosAcademicos");

  $scope.action = true; 
  $scope.nuevo = true;  
	
  $scope.nuevoTrabajador = function()
  {
		$scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.trabajador = {}; 
  };
 
	$scope.guardar = function(trabajador)
	{
		Accounts.createUser({
			username: $scope.trabajador.nombreUsuario,
			password: $scope.trabajador.contrasena,
			profile: {
				 nombre: $scope.trabajador.nombre,
				 apellidos: $scope.trabajador.apPaterno + " " + $scope.trabajador.apMaterno,
				 tipoUsuario: "Trabajador"
			},function(err) {
				if (err)
				   console.log(err);
				  else
				    console.log('success!');
				}
		});
		$scope.trabajador.estatus = true;
		$scope.trabajadores.save(trabajador);
		toastr.success('Empleado guardado.');
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
		
	};
	
	$scope.editar = function(id)
	{
    $scope.trabajador = $meteor.object(Trabajadores, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(trabajador)
	{
		$scope.trabajador.save();
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
		
	$scope.cambiarEstatus = function(id)
	{
		var trabajador = $meteor.object(Trabajadores, id, false);
		if(trabajador.estatus == true)
			trabajador.estatus = false;
		else
			trabajador.estatus = true;
		
		trabajador.save();
	};
	 $scope.tomarFoto = function(){
		$meteor.getPicture().then(function(data){
			$scope.trabajador.fotografia = data;
		})
	};

/*
  $scope.tieneFoto = function(trabajador){
		if (typeof trabajador.fotografia !== "undefined")
			return true;
		else
			return false;
	}	
*/
}]);



