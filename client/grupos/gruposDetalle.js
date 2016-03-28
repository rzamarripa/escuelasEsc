angular.module("casserole")
.controller("GruposDetalleCtrl", GruposDetalleCtrl);
 function GruposDetalleCtrl($scope, $meteor,$reactive , $state, $stateParams){
 	$reactive(this).attach($scope);
  this.action = true;
	
	this.inscripciones = $meteor.collection(function(){return Inscripciones.find({grupo_id: $stateParams.id})},false).subscribe("inscripciones");
	this.alumnos = $meteor.collection(function() {return Alumnos.find();}).subscribe("alumnos");

	this.grupo = $meteor.object(Grupos, $stateParams.id, false).subscribe("grupos");
	
	this.getAlumno = function(alumno_id){
		alumno = _.find(this.alumnos,function(x){return x._id==alumno_id;});
		return [alumno.matricula, alumno.nombre + " " + alumno.apPaterno + " " + alumno.apMaterno];
	}
	
};