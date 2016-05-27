angular
.module("casserole")
.controller("PlanEstudiosIndexCtrl", PlanEstudiosIndexCtrl);
function PlanEstudiosIndexCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
	let rc = $reactive(this).attach($scope);
	rc.action = $stateParams.id ? false : true; 
	rc.plan = {};
  	rc.plan.grados = [];
  rc.action = true;
  rc.subscribe('planesEstudios',function(){
  		if($stateParams.id){
  			
			console.log(PlanesEstudios.findOne({ _id: $stateParams.id }));
			console.log("|"+$stateParams.id+"|");
			rc.plan = PlanesEstudios.findOne({ _id: $stateParams.id });
			if(!rc.plan){
				rc.plan={};
				rc.plan.grados = [];
			}
			console.log(rc.plan); 
			rc.action = false;
			$('.collapse').coll
			
			rc.nuevo = false;
		}
  });
  rc.subscribe('secciones');
  rc.subscribe('materias');

  
  
	

	rc.helpers({
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

	
	

	
	rc.getSeccionById = function(id){ 
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
	
	rc.getGrados = function() {
		var gradosActuales=rc.plan? (rc.plan.grado? rc.plan.grado:0 ):0;		
		crearGrados(gradosActuales)
		return _.range(gradosActuales);   
	};

	rc.agregarMateria = function(nuevaMateria){
		var gradosActuales=rc.plan? (rc.plan.grado? rc.plan.grado:0 ):0;
		crearGrados(gradosActuales);
		
		
		rc.plan.grados[nuevaMateria.grado].push(nuevaMateria);
		rc.nuevaMateria="";
	};

	rc.quitarMateria = function(_materia){
		var i=rc.plan.grados[_materia.grado].indexOf(_materia);
		rc.plan.grados[_materia.grado].splice( i, 1 );
	}

	rc.guardar = function(plan)
	{
		
		plan.estatus = true;
		delete plan.$$hashKey;
		for (var i = 0; i < plan.grados.length; i++) {
			for (var j = 0; j < plan.grados[i].length; j++) {
				delete plan.grados[i][j].$$hashKey;
			};
		};
		console.log(plan);
		PlanesEstudios.insert(plan);	
		toastr.success('Plan de estudio guardado');	
		rc.plan = {}; 
		$('.collapse').collapse('hide');
		rc.nuevo = true;
		$state.go("root.planEstudio");
	};

	rc.editar = function(id)
	{
    rc.plan = PlanesEstudios.findOne({_id:id});
    rc.action = false;
    $('.collapse').coll
    rc.nuevo = false;
    console.log(rc.plan );
	};

	rc.actualizar = function()
	{
		var idTemp = rc.plan._id;
		delete rc.plan._id;	
		delete rc.plan.$$hashKey;
		for (var i = 0; i < rc.plan.grados.length; i++) {
			for (var j = 0; j < rc.plan.grados[i].length; j++) {
				delete rc.plan.grados[i][j].$$hashKey;
			};
		};
		PlanesEstudios.update({_id:idTemp},{$set:rc.plan});
		$('.collapse').collapse('hide');
		rc.nuevo = true;
	};


	rc.cambiarEstatus = function(id)
	{
		var plan = PlanesEstudios.findOne({_id:id});
		if(plan.estatus == true)
			plan.estatus = false;
		else
			plan.estatus = true;
		
		PlanesEstudios.update({_id: id},{$set :  {estatus : plan.estatus}});
  };
	/*rc.action = true;  

  
  	rc.guardar = function(asd)
	{
		rc.plan.estatus = true;
		rc.planesEstudios.save(rc.plan).then(function(docto){			
			$state.go("root.planEstudioDetalle",{"id":docto[0]._id});
		});
	};
	
	rc.nuevoAlumno = function()
	{
		rc.action = true;
	    rc.alumno = "";
	    
	};*/
};