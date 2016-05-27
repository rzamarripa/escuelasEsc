angular
.module("casserole")
.controller("GruposDetalleCtrl", GruposDetalleCtrl);
 function GruposDetalleCtrl($scope, $meteor, $reactive , $state, $stateParams){
 	$reactive(this).attach($scope);
  this.action = true;

  this.subscribe('inscripciones', () => {
	  return [{
		  grupo_id : $stateParams.id
	  }];
  });
  
  this.subscribe('alumnoss', () => {
	  return [{estatus:true}]
  });
  this.subscribe('grupos', () => {
	  return [{estatus:true}]
  });
  
  this.grupo = {};
  console.log(this);
	
	this.helpers({
	  inscripciones : () => {
		  return Inscripciones.find({grupo_id: $stateParams.id});
	  },
	   alumnos : () => {
		  return Alumnos.find();
	  },
	   grupo : () => {
		  return Grupos.findOne($stateParams.id);
	  },
  });
  	
	this.getAlumno = function(alumno_id){
		alumno = _.find(this.alumnos,function(x){return x._id==alumno_id;});
		if(alumno)
			return [alumno.matricula, alumno.nombre + " " + alumno.apPaterno + " " + alumno.apMaterno];
	}
	
};