angular
.module("casserole")
.controller("NuevoGrupoCtrl", NuevoGrupoCtrl); 
function NuevoGrupoCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
	let rc = $reactive(this).attach($scope);
	
	this.grupo = {};
	this.grados = [];
	this.subCiclosAcademicos = [];
	this.subCiclosAdministrativos = [];
	this.periodosAcademicos = [];
	this.periodosAdministrativos = [];

	this.subscribe('grupos', () => {
			return [{
				_id : $stateParams.id,
				estatus : true,
			}];
		}, {
		onReady:function(){
			rc.grupo = Grupos.findOne({_id:$stateParams.id});
  			console.log(rc.grupo);
  			console.log($stateParams.id);
		}});
	
	this.subscribe('secciones');
	
	this.subscribe('ciclos', () => {
		return [{
			estatus : true,
		}];
	});
	
	this.subscribe('subCiclos', () => {
		return [{
			ciclo_id : this.getReactively("grupo.ciclo_id")
		}];
	});
	
	this.subscribe('periodos', () => {
		return [{
			subCiclo_id : this.getReactively("grupo.subCicloAcademico_id")
		}];
	});
	
	this.subscribe('periodos', () => {
		return [{
			subCiclo_id : this.getReactively("grupo.subCicloAdministrativo_id")
		}];
	});
		
	
	this.subscribe('turnos');
	
	this.subscribe('maestros');

	this.autorun(() => {
	  	var seccion_id  = this.getReactively("grupo.seccion_id");
		console.log(seccion_id);
		rc.grados = [];
		var seccionSeleccionada = Secciones.findOne(seccion_id);
		for(var i = 1; seccionSeleccionada && i <= seccionSeleccionada.grados; i++ ){
			rc.grados.push(i);
		}
		
  	});

	this.helpers({
	  subCiclosAcademicos : () => {
		  return SubCiclos.find({ciclo_id : this.getReactively("grupo.ciclo_id"), tipo : "Academico"});
	  },
	  subCiclosAdministrativos : () => {
		  return SubCiclos.find({ciclo_id : this.getReactively("grupo.ciclo_id"), tipo : "Administrativo"});
	  },
	  periodosAcademicos : () => {
		  return Periodos.find({subCiclo_id : this.getReactively("grupo.subCicloAcademico_id")});
	  },
	  periodosAdministrativos : () => {
		  return Periodos.find({subCiclo_id : this.getReactively("grupo.subCicloAdministrativo_id")});
	  },
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
  
  if($stateParams.id)
  	this.action = false; 
  else
  	this.action = true;

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
		Grupos.update({_id:$stateParams.id}, {$set : grupo});
		toastr.success('Grupo guardado.');
		$state.go("root.grupos",{"id":$stateParams.id});
	};
	

};