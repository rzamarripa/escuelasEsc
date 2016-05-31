angular
.module("casserole")
.controller("NuevoGrupoCtrl", NuevoGrupoCtrl); 
function NuevoGrupoCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
	$reactive(this).attach($scope);
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
	  grupos : () => {
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

	//this.grupo = $meteor.object(Grupos, $stateParams.id).subscribe("grupos");

  this.action = true; 
  this.grupo = {};

	this.guardar = function(grupo)
	{
		this.grupo.estatus = true;
		Grupos.insert(this.grupo);
		toastr.success('Turno guardado.');
		this.grupo = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.grupos')
		console.log(grupo);
	};
	
	this.editarGrupo = function(id)
	{
    this.grupo = Grupos.findOne({_id:$stateParams.id});
    this.action = false;
    $('.collapse').collapse("show");
    this.nuevo = false;
	};
	
	this.getGrados = function(seccion_id){
		var seccionSeleccionada = $meteor.object(Secciones, seccion_id, false);
		this.grados = [];
		for(var i = 1; i <= seccionSeleccionada.grados; i++ ){
			this.grados.push(i);
		}
	}

};