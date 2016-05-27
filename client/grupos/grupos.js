angular.module("casserole")
.controller("GruposCtrl", GruposCtrl);
 function GruposCtrl($scope, $meteor, $reactive , $state, $stateParams, toastr){
 	let rc = $reactive(this).attach($scope);
  this.action = true;

	this.subscribe('grupos', () => {
		return [{
			estatus : true,
		}]
	});
	
	this.subscribe('secciones');
	
	this.subscribe('ciclos', () => {
		return [{estatus: true}]
	});
	
	this.subscribe('turnos'); 

	this.helpers({		
	  grupos : () => {
		  return Grupos.find();
	  }
  }); 

  this.nuevoGrupo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.grupo = {};
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
		var seccion = Secciones.find({_id:seccion_id});
		return [seccion.descripcion, seccion.grados];
	};

	this.getCiclo = function(ciclo_id)
	{
		ciclo = Ciclos.find({_id : ciclo_id});
		if(ciclo)
			return ciclo.descripcion;
	};	
	
	this.getTurno = function(turno_id)
	{
		var turno = Turnos.find(turno_id);
		return turno.nombre;
	};	
	
	this.getEstatus = function(estatus){
		if (estatus == false)
			return "Activar";
		else
			return "Desactivar";
	}
	
	this.getInscritos = function(id){
		var hola = this.subscribe('inscripciones', () => {
			return [{
				grupo_id : id
			}]
		});
		
		var inscritos = Inscripciones.find().count();
		
		console.log(hola);
		return inscritos;
	}
};