angular.module("casserole")
.controller("GruposCtrl", GruposCtrl);
 function GruposCtrl($scope, $meteor, $reactive , $state, $stateParams, toastr){
 	let rc = $reactive(this).attach($scope);
  this.action = true;
	this.grupos_ids = [];
	this.subscribe('grupos', () => {
		return [{
			estatus : true,
		}]
	});
	
	console.log($stateParams.id);
	
	this.subscribe('grupo', () => {
		
		return [{
			_id : $stateParams.id,
		}]
	});
	
	this.subscribe('secciones');
	
	this.subscribe('inscripciones', () => {
		return [{
			grupo_id : {$in : this.getCollectionReactively('grupos_ids')},
		}]
	});
	
	this.subscribe('ciclos', () => {
		return [{estatus: true}]
	});
	
	this.subscribe('turnos'); 

	this.helpers({		
		grupo : () => {
			return Grupos.findOne();
		},
	  grupos : () => {
		  _grupos = Grupos.find().fetch();
		  if(_grupos != undefined){
			  _.each(_grupos, function(grupo){
				  rc.grupos_ids.push(grupo._id);
			  });
		  }
		  return _grupos;
	  },
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
		var seccion = Secciones.findOne(seccion_id);
		return [seccion.descripcion, seccion.grados];
	};

	this.getCiclo = function(ciclo_id)
	{
		ciclo = Ciclos.findOne();
		if(ciclo)
			return ciclo.descripcion;
	};	
	
	this.getTurno = function(turno_id)
	{
		var turno = Turnos.findOne(turno_id);
		return turno.nombre;
	};	
	
	this.getEstatus = function(estatus){
		if (estatus == false)
			return "Activar";
		else
			return "Desactivar";
	}
	
	this.getInscritos = function(id){		
		var inscritos = Inscripciones.find({grupo_id : id}).count();
		return inscritos;
	}
};