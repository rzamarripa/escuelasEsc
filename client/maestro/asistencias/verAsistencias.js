angular.module("casserole")
.controller("MaestroVerAsistenciasCtrl",MaestroVerAsistenciasCtrl);  
function MaestroVerAsistenciasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $compile) {
	let rc=$reactive(this).attach($scope);


	this.subscribe('grupos',()=>{
		return [{id:$stateParams.id, estatus:true}]
	 });
	this.subscribe('alumnoss',()=>{
		return [{estatus:true}]
	 });
	 this.subscribe('asistencias',()=>{
		return [{ grupo_id : $stateParams.id, estatus:true}]
	});


	this.helpers({
	  grupo : () => {
		  return Grupos.findOne();
	  },
	  alumnos : () => {
		  return Alumnos.find();
	  },
	  asistencias : () => {
	  	 return Asistencias.find();
	  } 
	 
  });
	
	this.asistencia = {};
	this.alumnos = [];
  $meteor.call("getAsistencias").then(function (data) {	  
		this.asistencias = data;
		var transmutar = {};
		_.each(this.asistencias, function(asistencia){
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
		rc.alumnosAsistidos = _.toArray(transmutar);
		console.log(this.asistencias)
		console.log(rc.alumnosAsistidos)
  });
  
};
