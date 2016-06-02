angular.module("casserole")
.controller("GruposCtrl", GruposCtrl);
 function GruposCtrl($scope, $meteor, $reactive , $state, $stateParams, toastr){
 	let rc = $reactive(this).attach($scope);
 
  if ($stateParams.id != undefined) {
  	this.action = false;

  }else{
  	this.action = true;
  }
	this.grupos_ids = [];
	this.subscribe('grupos', () => {
		return [{
			estatus : true,
		}]
	});
	
	
	
	this.subscribe('grupo', () => {
		
		return [{
			_id : $stateParams.id, estatus : true
		}]
	});

	console.log($stateParams.id);
	
	this.subscribe('secciones');
	
	this.subscribe('inscripciones', () => {
		return [{
			grupo_id : {$in : this.getCollectionReactively('grupos_ids')},
		}]
	});
	
	this.subscribe('ciclos', () => {
		return [{estatus: true}]
	});

	this.subscribe('maestros', () => {
		return [{estatus: true}]
	});
	
	this.subscribe('turnos'); 

	this.helpers({		
		grupo : () => {
			return Grupos.findOne($stateParams.id);
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
	  secciones : () => {
		  return Secciones.find();
	  },
	  ciclos : () => {
		  return Ciclos.find();
	  },
	  turnos : () => {
		  return Turnos.find();
	  },
	  maestros : () => {
		  return Maestros.find();
	  },
  });

  this.nuevoGrupo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.grupo = {};
  }; 

  this.guardar = function(grupo)
	{
		this.grupo.estatus = true;
		grupo.inscritos = 0;
		Grupos.insert(this.grupo);
		toastr.success('Grupo guardado.');
		this.grupo = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.grupos');
	};

	
    this.actualizar = function(grupo)
    {
	    var idTemp = grupo._id;
		delete grupo._id;		
		Grupos.update({_id:$stateParams.id}, {$set : grupo});
		toastr.success('Grupo guardado.');
		$state.go("root.grupos",{"id":$stateParams.id});
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
		if(seccion)
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
		if (turno) 
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