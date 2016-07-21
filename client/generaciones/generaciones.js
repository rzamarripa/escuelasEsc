angular
.module("casserole")
.controller("GeneracionesCtrl", GeneracionesCtrl);
function GeneracionesCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr){
	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('generaciones',()=>{
		return [{estatus:true, seccion_id : Meteor.user() != undefined ? Meteor.user().profile.seccion_id : "",  }]
	 });

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
  
  	this.guardar = function(generacion,form)
	{
		if(form.$invalid){
	        toastr.error('Error al guardar los datos de las Generación.');
	        return;
	    }
	    this.generacion.estatus = true;
	    this.generacion.campus_id = Meteor.user().profile.campus_id;
	    this.generacion.seccion_id = Meteor.user().profile.seccion_id;
		console.log(this.generacion);
		Generaciones.insert(this.generacion);		
		toastr.success('Generación guardada.');
		this.generacion = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
	};
	
	this.editar = function(id)
	{
    this.generacion = Generaciones.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(generacion,form)
	{
		if(form.$invalid){
	        toastr.error('Error al actualizar los datos de las Generación.');
	        return;
	    }
		var idTemp = generacion._id;
		delete generacion._id;		
		Generaciones.update({_id:idTemp},{$set:generacion});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
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
	
	