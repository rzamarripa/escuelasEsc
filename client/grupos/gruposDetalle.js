angular.module("casserole").controller("GruposDetalleCtrl", function($scope, $meteor, $state, $stateParams)
{
	
	$scope.inscripciones = $meteor.collection(function(){return Inscripciones.find({grupo_id: $stateParams.id})},false).subscribe("inscripciones");
	$scope.alumnos = $meteor.collection(function() {return Alumnos.find();}).subscribe("alumnos");

	$scope.grupo = $meteor.object(Grupos, $stateParams.id, false).subscribe("grupos");
	
	$scope.getAlumno = function(alumno_id){
		alumno = _.find($scope.alumnos,function(x){return x._id==alumno_id;});
		return [alumno.matricula, alumno.nombre + " " + alumno.apPaterno + " " + alumno.apMaterno];
	}
	
});