angular.module("casserole").controller("AlumnosCtrl", ['$scope', '$meteor', '$state', 'toastr', function($scope, $meteor, $state, toastr) {

  $scope.action = true;
  $scope.alumno = {};

	$scope.ocupaciones = $scope.$meteorCollection(function () {
    return Ocupaciones.find();
  }).subscribe("ocupaciones");

  $scope.alumnos = $scope.$meteorCollection(function (){
    return Alumnos.find();
  }).subscribe("alumnos");
  
  $scope.guardar = function (alumno) {
		$scope.alumno.estatus = true;
		$scope.$meteorCollection(Alumnos).save(alumno).then(function (docto) {
			Meteor.call('createUsuario', alumno, 'alumno');
      toastr.success('Alumno guardado.');
			$state.go("root.alumnoDetalle",{"id":docto[0]._id});

			$('.collapse').collapse('hide');
			$scope.nuevo = true;
		});		

	};
	
  $scope.nuevoAlumno = function () {
    $scope.action = true;
    $scope.alumno = {};    
  };
  
  $scope.tomarFoto = function () {
		$meteor.getPicture().then(function(data){
			$scope.alumno.fotografia = data;
		})
	};
	
	$scope.cambiarEstatus = function (id) {
		var alumno = $scope.$meteorObject(Alumnos, id, false);
    alumno.estatus = !alumno.estatus;
		alumno.save();
	};	
	
}]);
