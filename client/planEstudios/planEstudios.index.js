angular
.module("casserole")
.controller("PlanEstudiosIndexCtrl", PlanEstudiosIndexCtrl);
function PlanEstudiosIndexCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
	let rc = $reactive(this).attach($scope);
  this.action = true;
  this.subscribe('planesEstudios');
  this.subscribe('secciones');
  this.subscribe('materias');

  rc.plan = {};
  
  rc.plan.grados = [];

	this.helpers({
	  planesEstudios : () => {
		  return PlanesEstudios.find();
	  },
	  secciones : () => {
		  return Secciones.find();
	  },
	  materias : () => {
		  return Materias.find();
	  },	  
  });	

	this.action = $stateParams.id ? false : true; 
	
	this.getSeccionById = function(id){ 
		return Secciones.getSeccionById(id)
	};
	
	function crearGrados(gradosActuales){
		if(gradosActuales <1 ){
			rc.plan.grados = [];
			return;
		}
		if(!rc.plan.grados){
			rc.plan.grados = [];
			for (var i = 0; i < gradosActuales; i++) {
				rc.plan.grados[i]=[];
			};
		}
		
		while(gradosActuales<rc.plan.grados.length)rc.plan.grados.pop();
		while(gradosActuales>rc.plan.grados.length)rc.plan.grados.push([]);
	}
	
	this.getGrados = function() {
		var gradosActuales=rc.plan? (rc.plan.grado? rc.plan.grado:0 ):0;		
		crearGrados(gradosActuales)
		return _.range(gradosActuales);   
	};

	this.agregarMateria = function(nuevaMateria){
		var gradosActuales=rc.plan? (rc.plan.grado? rc.plan.grado:0 ):0;
		crearGrados(gradosActuales);
		console.log(nuevaMateria);
		
		rc.plan.grados[nuevaMateria.grado].push(nuevaMateria);
		rc.nuevaMateria="";
	};

	this.quitarMateria = function(_materia){
		var i=rc.plan.grados[_materia.grado].indexOf(_materia);
		rc.plan.grados[_materia.grado].splice( i, 1 );
	}

	this.guardar = function(plan)
	{
		console.log(plan);
		plan.estatus = true;
		delete plan.$$hashKey;
		PlanesEstudios.insert(plan);	
		toastr.success('Plan de estudio guardado');	
		rc.plan = {}; 
		$('.collapse').collapse('hide');
		rc.nuevo = true;
		$state.go("root.planEstudio");
	};

	this.editar = function(id)
	{
    rc.plan = PlanesEstudios.findOne({_id:id});
    this.action = false;
    $('.collapse').coll
    this.nuevo = false;
	};

	this.actualizar = function()
	{
		var idTemp = rc.plan._id;
		delete this.plan._id;	
		PlanesEstudios.update({_id:idTemp},{$set:rc.plan});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};


	this.cambiarEstatus = function(id)
	{
		var plan = PlanesEstudios.findOne({_id:id});
		if(plan.estatus == true)
			plan.estatus = false;
		else
			plan.estatus = true;
		
		PlanesEstudios.update({_id: id},{$set :  {estatus : plan.estatus}});
  };
	/*this.action = true;  

  
  	this.guardar = function(asd)
	{
		this.plan.estatus = true;
		this.planesEstudios.save(this.plan).then(function(docto){			
			$state.go("root.planEstudioDetalle",{"id":docto[0]._id});
		});
	};
	
	this.nuevoAlumno = function()
	{
		this.action = true;
	    this.alumno = "";
	    
	};*/
};