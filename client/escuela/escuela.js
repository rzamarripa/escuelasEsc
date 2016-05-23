angular.module("casserole")
.controller("EscuelaCtrl", EscuelaCtrl);  
 function EscuelaCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;	  
  
	this.subscribe('escuelas');

	this.helpers({
	  escuelas : () => {
		  return Escuelas.find();
	  }
  }); 
  
  this.nuevoEscuelas = function()
  {
    this.action = true;
    this.nuevo = false;
    this.escuela = {};		
  };
  
  this.guardar = function(escuela)
	{
		this.escuela.estatus = true;
		console.log(this.escuela);
		Escuelas.insert(this.escuela);
		toastr.success('Escuela guardada.');
		this.escuela = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	
	this.editar = function(id)
	{
    this.escuela = Escuelas.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(escuela)
	{
		console.log(escuela);
		var idTemp = escuela._id;
		delete escuela._id;		
		Escuelas.update({_id:idTemp},{$set : escuela});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var escuela = Escuelas.findOne({_id:id});
		if(escuela.estatus == true)
			escuela.estatus = false;
		else
			escuela.estatus = true;
		
		Escuelas.update({_id: id},{$set :  {estatus : escuela.estatus}});
    };
		
};
