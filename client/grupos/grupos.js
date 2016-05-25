angular.module("casserole")
.controller("GruposCtrl", GruposCtrl);
 function GruposCtrl($scope, $meteor, $reactive , $state, $stateParams, toastr){
 	let rc = $reactive(this).attach($scope);
  this.action = true;

	this.subscribe('grupos');
	this.subscribe('secciones');
	this.subscribe('ciclos', () => {
		return [{estatus: true}]
	});
	this.subscribe('turnos'); 

	$(document).ready(function() {
	  $(".select2").select2();
	});

	this.helpers({
	  grupos : () => {
		  return Grupos.find();
	  },
	   secciones : () => {
		  return Secciones.find();
	  },
	   ciclos : () => {
		  return Ciclos.find();
	  },
	   turnos : () => {
		  return Turnos.find();
	  },
  }); 

  this.nuevoGrupo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.grupo = {};
  }; 

	this.actualizar = function(grupo)
	{
		var idTemp = grupo._id;
		delete grupo._id;		
		Grupos.update({_id:idTemp},{$set:grupo});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var grupo = Grupos.findOne({_id:id});
		if(grupo.estatus == true)
			grupo.estatus = false;
		else
			grupo.estatus = true;		
		Grupos.update({_id:id},  {$set : {estatus: grupo.estatus}});
	};
	
	this.getSeccion = function(seccion_id)
	{
		var seccion = $meteor.object(Secciones, seccion_id, false);
		return [seccion.descripcion, seccion.grados];
	};

	this.getCiclo = function(ciclo_id)
	{
		ciclo = _.find(rc.ciclos,function(x){return x._id==ciclo_id;});
		return ciclo.anioEscolar + " " + ciclo.complementoEscolar;
	};	
	
	this.getTurno = function(turno_id)
	{
		var turno = $meteor.object(Turnos, turno_id, false);
		return turno.nombre;
	};	
	
	this.getEstatus = function(estatus){
		if (estatus == false)
			return "Activar";
		else
			return "Desactivar";
	}
};