angular
.module("casserole")
.controller("NuevoGrupoCtrl", NuevoGrupoCtrl); 
function NuevoGrupoCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
	let rc = $reactive(this).attach($scope);
	
	this.grupo = {};
	this.grupo.inscripcion = {};
	this.grupo.colegiatura = {};
	this.grados = [];
	this.subCiclosAcademicos = [];
	this.subCiclosAdministrativos = [];
	this.periodosAcademicos = [];
	this.periodosAdministrativos = [];

	var quitarhk=function(obj){
		if(Array.isArray(obj)){
			for (var i = 0; i < obj.length; i++) {
				obj[i] =quitarhk(obj[i]);
			}
		}
		else if(obj !== null && typeof obj === 'object')
		{
			delete obj.$$hashKey;
			for (var name in obj) {
	  			obj[name] = quitarhk(obj[name]);
			}

		}
		return obj;
	}

	this.subscribe('grupos', () => {
			return [{
				_id : $stateParams.id,
				estatus : true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : ""
			}];
		}, {
		onReady:function(){
			rc.grupo = Grupos.findOne({_id:$stateParams.id});
  			console.log(rc.grupo);
  			console.log($stateParams.id);
		}});
	
	this.subscribe('secciones',()=>{
		return [{estatus:true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	 });
	this.subscribe('horarios',()=>{
		return [{estatus:true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	 });
	this.subscribe('ciclos', () => {
		return [{
			estatus : true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : ""
		}];
	});
	
	this.subscribe('subCiclos', () => {
		return [{
			ciclo_id : this.getReactively("grupo.ciclo_id"), campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : ""
		}];
	});
	
/*	this.subscribe('periodos', () => {
		return [{
			subCiclo_id : this.getReactively("grupo.subCicloAcademico_id")
		}];
	});
	*/
	this.subscribe('periodos', () => {
		return [{
			subCiclo_id : this.getReactively("grupo.subCicloAdministrativo_id"), campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : ""
		}];
	});
		
	
	this.subscribe('turnos',()=>{
		return [{estatus:true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	 });

	
	this.subscribe('maestros',()=>{
		return [{estatus:true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	 });


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
	  horarios : ()=>{
	  	return Horarios.find();
	  },
	  maestros : () => {
		  return Maestros.find();
	  },
	  periodosAdministrativos : () =>{
	  	var periodos =Periodos.find({subCiclo_id:this.getReactively('grupo.subCicloAdministrativo_id')}).fetch();
	  	var planviejo ={}
	  	if(!this.grupo)
	  		this.grupo={};
	  	if(!this.grupo.plan)
	  		this.grupo.plan={};
	  	else{
	  		planviejo=this.grupo.plan;
	  		this.grupo.plan={};
	  	}
	  	for (var i = 0; i < periodos.length; i++) {
	  		var periodo =periodos[i];
	  		
	  		this.grupo.plan[periodo.nombre]={};
	  		this.grupo.plan[periodo.nombre].tipoPlan = '';
	  		this.grupo.plan[periodo.nombre].datos=[];
	  		console.log(periodo.planPago);
	  		this.grupo.plan[periodo.nombre].planPago = periodo.planPago;

	  		console.log(periodo)
	  		for (var j = 0; periodo && periodo.conceptos && j < periodo.conceptos.length; j++) {
	  			var concepto=periodos[i].conceptos[j];

	  			var _grupo = {}
	  			_grupo.activa=true
	  			_grupo = concepto;
	  			//_grupo.plan = periodo.plan;

	  			//_grupo.modulo = periodo.modulo;
	  			//_grupo = concepto;
	  			if(planviejo && planviejo[periodo.nombre] &&
	  				planviejo[periodo.nombre].datos )
	  				{
	  					var viejos=planviejo[periodo.nombre].datos ;
	  					console.log(viejos);
	  					for (var k = 0; k < viejos.length; k++) {
	  						if(viejos[k].nombre==_grupo.nombre){
	  							_grupo.importe = viejos[k].importe
	  							_grupo.activa = viejos[k].activa
	  						}
	  					}

	  				}
	  			this.grupo.plan[periodo.nombre].tipoPlan = periodo.modulo;
	  			this.grupo.plan[periodo.nombre].datos.push(_grupo);

	  			
	  		}
	  	}

	  	
	  	console.log('si entre',this.grupo);
	  	return Periodos.find({subCiclo_id:this.getReactively('grupo.subCicloAdministrativo_id')});
	  }
  });
  
  if($stateParams.id)
  	this.action = false; 
  else
  	this.action = true;

	this.guardar = function(grupo,form)
	{
		if(form.$invalid){
	        toastr.error('Error al guardar los datos del Grupo.');
	        return;
	    }
		this.grupo.estatus = true;
		this.grupo.campus_id = Meteor.user().profile.campus_id;
		grupo.inscritos = 0;
		horario = Horarios.findOne(grupo.horario_id);
		_grupo =quitarhk(grupo)
		__grupo_id = Grupos.insert(_grupo);
		_.each(horario.clases, function(clase){
			mmg = {}; 
			mmg.materia_id = clase.materia_id; 
			mmg.maestro_id = clase.maestro_id;
			mmg.grupo_id = __grupo_id;
			MaestrosMateriasGrupos.insert(mmg);
		});
		toastr.success('Grupo guardado.');
		this.grupo = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
		$state.go('root.grupos');
	};
	
	this.editarGrupo = function(id)
	{
	    rc.grupo = Grupos.findOne({_id:$stateParams.id});
	    this.action = false;
	    $('.collapse').collapse("show");
	    this.nuevo = false;
	};
	
	this.actualizar = function(grupo,form)
	{
		if(form.$invalid){
	        toastr.error('Error al actualizar los datos del Grupo.');
	        return;
	    }
		var idTemp = grupo._id;
		delete grupo._id;	
		_grupo =quitarhk(grupo)	
		Grupos.update({_id:$stateParams.id}, {$set : _grupo});
		toastr.success('Grupo guardado.');
		$state.go("root.grupos",{"id":$stateParams.id});
		form.$setPristine();
        form.$setUntouched();
	};	

};