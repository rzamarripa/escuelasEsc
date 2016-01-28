angular.module("casserole").controller("AlumnosDetalleCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
	$scope.alumno = $meteor.object(Alumnos, $stateParams.id).subscribe("alumnos");	
	$scope.ocupaciones = $meteor.collection(function(){return Ocupaciones.find();}).subscribe("ocupaciones");
	$scope.fechaActual = new Date();
	
	$scope.actualizar = function(alumno)
	{
		$scope.alumno.save();
		toastr.success('Alumno guardado.');
		$state.go("root.alumnoDetalle",{"id":alumno._id});
	};
	
	$scope.tomarFoto = function () {
		$meteor.getPicture().then(function(data){
			$scope.alumno.fotografia = data;
		})
	};
	
	$scope.getOcupacion = function(id){
		var ocupacion = $meteor.object(Ocupaciones, id, false);
		return ocupacion.descripcion;
	}
}]);