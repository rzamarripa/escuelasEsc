angular.module("casserole")
.controller("EscuelasCtrl", EscuelasCtrl);  
 function EscuelasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('escuelas');

	this.helpers({
	  escuelas : () => {
		  return Escuelas.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoEscuelas = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
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
		$state.go('root.escuelas')
	};
	
	this.editar = function(id)
	{
    this.escuela = Escuelas.findOne({_id:id});
    this.action = false;
    $('.collapse').coll
    this.nuevo = false;
	};
	
	this.actualizar = function(escuela)
	{
		var idTemp = escuela._id;
		delete escuela._id;		
		Escuelas.update({_id:idTemp},{$set:escuela});
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
