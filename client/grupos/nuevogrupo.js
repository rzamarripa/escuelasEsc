angular
.module("casserole")
.controller("NuevoGrupoCtrl", NuevoGrupoCtrl); 
function NuevoGrupoCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
	let rc = $reactive(this).attach($scope);
	this.subscribe('grupos', () => {
		return [{
			_id : $stateParams.id,
			estatus : true,
		}]
	});
	this.subscribe('secciones');
	this.subscribe('ciclos', () => {
		return [{
			estatus : true,
		}]
	});
	this.subscribe('turnos');
	this.subscribe('maestros');

	this.helpers({
	  grupo : () => {
		  return Grupos.findOne();
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
  
  if($stateParams.id)
  	this.action = false;
  else
  	this.action = true;

  this.grupo = {};
  
  console.log(rc.grupo);

	this.guardar = function(grupo)
	{
		this.grupo.estatus = true;
		Grupos.insert(this.grupo);
		toastr.success('Grupo guardado.');
		this.grupo = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.grupos');
	};
	
	this.editarGrupo = function(id)
	{
    rc.grupo = Grupos.findOne({_id:$stateParams.id});
    this.action = false;
    $('.collapse').collapse("show");
    this.nuevo = false;
	};
	
	this.actualizar = function(grupo)
	{
		var idTemp = grupo._id;
		delete grupo._id;		
		Grupos.update({_id:idTemp},{$set:grupo});
		$state.go('root.grupos');
	};
	
	this.getGrados = function(seccion_id){
		var seccionSeleccionada = $meteor.object(Secciones, seccion_id, false);
		this.grados = [];
		for(var i = 1; i <= seccionSeleccionada.grados; i++ ){
			this.grados.push(i);
		}
	}

};