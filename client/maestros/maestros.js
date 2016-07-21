angular
.module("casserole")
.controller("MaestrosCtrl", MaestrosCtrl);
function MaestrosCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr){
	
	let rc = $reactive(this).attach($scope);
	this.action = true;
	this.subscribe('maestros',()=>{
		return [{estatus:true, seccion_id : Meteor.user() != undefined ? Meteor.user().profile.seccion_id : "" }]
	 });

	this.helpers({
	  maestros : () => {
		  return Maestros.find();
	  }
  });

  this.nuevo = true;
  	  
  this.nuevoMaestro = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.maestro = {}; 
  };

	this.guardar = function(maestro,form)
	{
		if(form.$invalid){
	        toastr.error('Error al guardar los datos del Maestro.');
	        return;
	    }
	
		this.maestro.estatus = true;
		this.maestro.campus_id = Meteor.user().profile.campus_id;
		this.maestro.seccion_id = Meteor.user().profile.seccion_id;
		var id = Maestros.insert(this.maestro);
		rc.maestro.maestro_id = id;
		Meteor.call('createUsuario', rc.maestro, 'maestro');
		toastr.success("Maestro Creado \n Usuario Creado");
		this.maestro = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
		$state.go('root.maestros');
	};

	this.editar = function(id)
	{
		console.log(id);
	    this.maestro = Maestros.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(maestro,form)
	{
		if(form.$invalid){
	        toastr.error('Error al guardar los datos del Maestro.');
	        return;
	    }
		var idTemp = maestro._id;
		delete maestro._id;		
		Maestros.update({_id:idTemp},{$set:maestro});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
	};
		
	this.cambiarEstatus = function(id)
	{
		var maestro = Mestros.findOne({_id:id});
		if(maestro.estatus == true)
			maestro.estatus = false;
		else
			maestro.estatus = true;
		
		Maestros.update({_id:id}, {$set : {estatus : maestro.estatus}});
	};

	this.tomarFoto = function(){
			$meteor.getPicture().then(function(data){
			rc.maestro.fotografia = data;
		});
	};
	
};



