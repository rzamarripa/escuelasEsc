angular.module("casserole").controller("MaestroAsistenciasCtrl", ['$scope', '$meteor', '$state', '$stateParams', 'toastr', 
function($scope, $meteor, $state, $stateParams, toastr) {
	
	$scope.asistencia = {};
  $meteor.call("getAlumnosGrupo", {grupo_id:$stateParams.id}).then(function (data) {	  
    $scope.asistencia.alumnos = data;
  });
  
  $scope.guardar = function(asistencia){
	  _.each(asistencia.alumnos, function(alumno){
		  delete alumno['$$hashKey'];
	  })
	  var asistenciaActual = {
		  alumnos : asistencia.alumnos,
		  fechaAsistencia : new Date(),
		  usuario : Meteor.user().username,
	  }

		$meteor.call("setAsistencia", asistenciaActual).then(function (data) {
			if(data == true){
				toastr.success("Gracias por tomar asistencia");
				$state.go("root.verAsistencias", {id:$stateParams.id});
			}else{
				toastr.success("Hubo un problema al tomar asistencia");
			}
	    
	  });
		
	}
	
	
  
}]);