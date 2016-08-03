angular
.module("casserole")
.controller("GerentesVentaCtrl", GerentesVentaCtrl);
function GerentesVentaCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {
	
  let rc = $reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;  
  
	this.subscribe('gerentesVenta',()=>{
<<<<<<< HEAD
		return [{campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
=======
		return [{}]
>>>>>>> b8e5de7bab3bb737f3b84f32020e317923691e35
	 });
 
  this.helpers({
	  gerentesVenta : () => {
		  var usuarios = Meteor.users.find().fetch();
		  var gerentes = [];
		  _.each(usuarios, function(usuario){
			  if(usuario.roles[0] == "gerenteVenta" && usuario.profile.campus_id ==( Meteor.user() != undefined ? Meteor.user().profile.campus_id : "")){
				  gerentes.push(usuario);
			  }
		  });
		  return gerentes;
	  }
  });  
  
  this.nuevoGerenteVenta = function()
  {
			this.action = true;
	    this.nuevo = !this.nuevo;
	    this.gerenteVenta = {}; 
	    this.gerenteVenta.profile = {};
  };
 
	this.guardar = function(gerenteVenta,form)
	{		
<<<<<<< HEAD
			if(form.$invalid){
		      toastr.error('Error al guardar los datos.');
		      return;
			}
			gerenteVenta.profile.estatus = true;
			gerenteVenta.profile.campus_id = Meteor.user().profile.campus_id;
			gerenteVenta.usuarioInserto = Meteor.userId();
			Meteor.call('createGerenteVenta', gerenteVenta, 'gerenteVenta');
			toastr.success('Guardado correctamente.');
			this.nuevo = true;
			this.gerenteVenta = {};
			$('.collapse').collapse('hide');
			this.nuevo = true;		
			form.$setPristine();
			form.$setUntouched();
=======
		if(form.$invalid){
			toastr.error('Error al guardar los datos del Gerente de Venta.');
			return;
		}
		gerenteVenta.profile.estatus = true;
		gerenteVenta.profile.campus_id = Meteor.user().profile.campus_id;
		gerenteVenta.seccion_id = Meteor.user().profile.seccion_id;
		Meteor.call('createGerenteVenta', gerenteVenta, 'gerenteVenta');
		toastr.success('Gerente de Venta Guardado.');
		this.nuevo = true;
		this.gerenteVenta = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;		
		form.$setPristine();
		form.$setUntouched();
>>>>>>> b8e5de7bab3bb737f3b84f32020e317923691e35
	};
	
	this.editar = function(id)
	{
    this.gerenteVenta = Meteor.users.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(gerenteVenta,form)
	{
<<<<<<< HEAD
			if(form.$invalid){
		        toastr.error('Error al actualizar los datos del Gerente de Venta.');
		        return;
		  }
			Meteor.call('updateGerenteVenta', gerenteVenta, 'gerenteVenta');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
=======
		console.log(gerenteVenta);
		if(form.$invalid){
			toastr.error('Error al actualizar los datos del Gerente de Venta.');
			return;
		}
		Meteor.call('updateGerenteVenta', gerenteVenta, 'gerenteVenta');
		$('.collapse').collapse('hide');
		this.nuevo = true;
		this.gerenteVenta = {};
		form.$setPristine();
		form.$setUntouched();
>>>>>>> b8e5de7bab3bb737f3b84f32020e317923691e35
	};
	
	/*
	this.cambiarEstatus = function(id)
	{
			var gerenteVenta = gerentes.findOne({_id:id});
			if(gerenteVenta.estatus == true)
				gerenteVenta.estatus = false;
			else
				gerenteVenta.estatus = true;
			
			gerentes.update({_id:id}, {$set : {estatus : gerenteVenta.estatus}});
	};
	*/
	
		
	this.tomarFoto = function(){
		$meteor.getPicture({width:200, height: 200, quality: 50}).then(function(data){
			rc.gerenteVenta.profile.fotografia = data;
		});
	};
};