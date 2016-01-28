angular.module("casserole").controller("MaestroVerAsistenciasCtrl", ['$scope', '$meteor', '$state', '$stateParams', 'toastr', '$compile', 
function($scope, $meteor, $state, $stateParams, toastr, $compile) {
	
	$scope.asistencia = {};
	$scope.alumnos = [];
  $meteor.call("getAsistencias").then(function (data) {	  
		$scope.asistencias = data;
		var transmutar = {};
		_.each($scope.asistencias, function(asistencia){
			_.each(asistencia.alumnos, function(alumno){
				if("undefined" == typeof transmutar[alumno.nombre]){
					transmutar[alumno.nombre]={};
					transmutar[alumno.nombre].nombre = alumno.nombre + " " + alumno.apPaterno + " " + alumno.apMaterno; 
					transmutar[alumno.nombre].matricula = alumno.matricula; 
					transmutar[alumno.nombre].dias = [];
				}
				transmutar[alumno.nombre].dias.push(alumno.checked);
			})
		});
		$scope.alumnosAsistidos = _.toArray(transmutar);
  });
  
}]);
