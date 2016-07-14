angular.module("casserole")
.controller("EscuelaCtrl", EscuelaCtrl);  
 function EscuelaCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;	  
  
	this.subscribe('escuelas',()=>{
		return [{estatus:true, campus_id : this.getReactively('Meteor.user().profile.campus_id') }]
	 });
	 
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
  
  this.guardar = function(escuela,form)
	{
		if(form.$invalid){
	        toastr.error('Error al guardar los datos de la Escuela de Procedencia.');
	        return;
	    }
		this.escuela.estatus = true;
		this.escuela.campus_id = Meteor.user().profile.campus_id;
		console.log(this.escuela);
		Escuelas.insert(this.escuela);
		toastr.success('Escuela guardada.');
		this.escuela = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
		
	};
	
	this.editar = function(id)
	{
	    this.escuela = Escuelas.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(escuela,form)
	{
		if(form.$invalid){
	        toastr.error('Error al actualizar los datos de la Escuela de Procedencia.');
	        return;
	    }
		var idTemp = escuela._id;
		delete escuela._id;		
		Escuelas.update({_id:idTemp},{$set : escuela});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
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
