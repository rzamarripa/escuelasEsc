angular
.module("casserole")
.controller("PlanEstudiosIndexCtrl", PlanEstudiosIndexCtrl);
function PlanEstudiosIndexCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
	$reactive(this).attach($scope);
  this.action = true;
  this.subscribe('planesEstudios');
  this.subscribe('secciones');
  this.subscribe('materias');
	//
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
	  plan :() =>{
	  	return PlanesEstudios.findOne($stateParams.id);
	  }
  });
	

	this.action = $stateParams.id? false:true; 
	this.getSeccionById = function(id){ return Secciones.getSeccionById(id)};
	
	function crearGrados(gradosActuales){
		if(gradosActuales <1 ){
			this.plan.grados=[];
			return;
		}
		if(!this.plan.grados){
			this.plan.grados=[];
			for (var i = 0; i < gradosActuales; i++) {
				grados[i]=[];
			};
		}
		while(gradosActuales<this.plan.grados.length)this.plan.grados.pop();
		while(gradosActuales>this.plan.grados.length)this.plan.grados.push([]);


	}
	this.getGrados = function() {
		var gradosActuales=this.plan? (this.plan.grado? this.plan.grado:0 ):0;
		
		crearGrados(gradosActuales)

		return _.range(gradosActuales);   
	};

	this.agregarMateria = function(nuevaMateria){
		var gradosActuales=this.plan? (this.plan.grado? this.plan.grado:0 ):0;
		crearGrados(gradosActuales)
		
		this.plan.grados[nuevaMateria.grado].push(nuevaMateria);
		this.nuevaMateria="";
		
	};

	this.quitarMateria = function(_materia){
		var i=this.plan.grados[_materia.grado].indexOf(_materia);
		this.plan.grados[_materia.grado].splice( i, 1 );
	}

	this.guardar = function(plan)
	{

		this.plan.estatus = true;
		console.log(this.plan);
		PlanesEstudios.insert(this.plan);	
		toastr.success('Plan de estudio guardado');	
		this.plan = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
			$state.go("root.planEstudio");

	
		
	};

	this.editar = function(id)
	{
    this.plan = PlanesEstudios.findOne({_id:id});
    this.action = false;
    $('.collapse').coll
    this.nuevo = false;
	};

	this.actualizar = function()
	{
		var idTemp = this.plan._id;
		console.log(idTemp);
		delete this.plan._id;	
		console.log(this.plan);	
		PlanesEstudios.update({_id:idTemp},{$set:this.plan});
		console.log(idTemp);
		$('.collapse').collapse('hide');
		console.log(idTemp);
		this.nuevo = true;
		console.log(idTemp);
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