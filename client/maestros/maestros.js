angular
.module("casserole")
.controller("MaestrosCtrl", MaestrosCtrl);
function MaestrosCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr){
	let rc = $reactive(this).attach($scope);
  this.action = true;
	this.subscribe('maestros');

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

	this.guardar = function(maestro)
	{
		this.maestro.estatus = true;
		console.log(this.maestro);
		var id = Maestros.insert(this.maestro);
		rc.maestro.maestro_id = id;
		Meteor.call('createUsuario', rc.maestro, 'maestro');
		toastr.success("Maestro Creado \n Usuario Creado");
		this.maestro = {};
		$('.collapse').collapse('show');
		this.nuevo = true;
		$state.go('root.maestros');
	};




	this.editar = function(id)
	{
     this.maestro = Maestros.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(maestro)
	{
		var idTemp = maestro._id;
		delete maestro._id;		
		Maestros.update({_id:idTemp},{$set:maestro});
		$('.collapse').collapse('hide');
		this.nuevo = true;
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
			this.maestro.fotografia = data;
		});
	};
	
};



