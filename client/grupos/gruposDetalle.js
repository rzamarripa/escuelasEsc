angular
.module("casserole")
.controller("GruposDetalleCtrl", GruposDetalleCtrl);
 function GruposDetalleCtrl($scope, $meteor,$reactive , $state, $stateParams){
 	$reactive(this).attach($scope);
  this.action = true;

  this.subscribe('inscripciones');
  this.subscribe('alumnos');
  this.subscribe('grupos');
	
	this.helpers({
	  inscripciones : () => {
		  return Inscripciones.find({grupo_id: $stateParams.id});
	  },
	   alumnos : () => {
		  return Alumnos.find();
	  },
	   grupos : () => {
		  return Grupos.find(Grupos, $stateParams.id);
	  },
  });
	//this.inscripciones = $meteor.collection(function(){return Inscripciones.find({grupo_id: $stateParams.id})},false).subscribe("inscripciones");


	
	this.getAlumno = function(alumno_id){
		alumno = _.find(this.alumnos,function(x){return x._id==alumno_id;});
		return [alumno.matricula, alumno.nombre + " " + alumno.apPaterno + " " + alumno.apMaterno];
	}
	
};