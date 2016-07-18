angular
.module("casserole")
.controller("GerentesVentaCtrl", GerentesVentaCtrl);
function GerentesVentaCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {
	
  let rc = $reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;  
  
	this.subscribe('gerentesVenta',()=>{
		return [{estatus:true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	 });
 
  this.helpers({
	  gerentesVenta : () => {
		  var usuarios = Meteor.users.find().fetch();
		  var gerentes = [];
		  _.each(usuarios, function(usuario){
			  console.log(usuario);
			  if(usuario.roles[0] == "gerenteVenta" && usuario.profile.campus_id == Meteor.user() != undefined ? Meteor.user().profile.campus_id : ""){
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
 
	this.guardar = function(gerenteVenta)
	{		
		if(form.$invalid){
	        toastr.error('Error al guardar los datos del Gerente de Venta.');
	        return;
	    }
		gerenteVenta.profile.estatus = true;
		gerenteVenta.profile.campus_id = Meteor.user().profile.campus_id;
		Meteor.call('createGerenteVenta', gerenteVenta, 'gerenteVenta');
		toastr.success('Gerente de Venta Guardado.');
		this.nuevo = true;
		this.gerenteVenta = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;		
		form.$setPristine();
        form.$setUntouched();
	};
	
	this.editar = function(id)
	{
	    this.gerenteVenta = Meteor.users.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(gerenteVenta)
	{
		if(form.$invalid){
	        toastr.error('Error al actualizar los datos del Gerente de Venta.');
	        return;
	    }
		Meteor.call('updateGerenteVenta', gerenteVenta, 'gerenteVenta');
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
	};
		
	this.tomarFoto = function(){
		$meteor.getPicture({width:200, height: 200, quality: 50}).then(function(data){
			rc.gerenteVenta.profile.fotografia = data;
		});
	};
};