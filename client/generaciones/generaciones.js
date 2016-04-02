angular
.module("casserole")
.controller("GeneracionesCtrl", GeneracionesCtrl);
function GeneracionesCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr){
	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('generaciones');

	this.helpers({
	  generaciones : () => {
		  return Generaciones.find();
	  }
  });

 
  this.nuevo = true	  
  this.nuevoGeneracion = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.generacion = {}; 
  };
  
 this.guardar = function(generacion)
	{
	    this.generacion.estatus = true;
		console.log(this.generacion);
		Generaciones.insert(this.generacion);		
		toastr.success('generacion guardada.');
       this.generacion = {};
		$('.collapse').collapse('show');
		this.nuevo = true;
		$state.go('root.generaciones');
	};
	
	this.editar = function(id)
	{
    this.generacion = Generaciones.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(generacion)
	{
		var idTemp = generacion._id;
		delete generacion._id;		
		Generaciones.update({_id:idTemp},{$set:generacion});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
		
    this.cambiarEstatus = function(id)
	{
		var generacion = Generaciones.findOne({_id:id});
		if(generacion.estatus == true)
			generacion.estatus = false;
		else
			generacion.estatus = true;
		
		Generaciones.update({_id:id}, {$set : {estatus : generacion.estatus}});
	};
};
	
	