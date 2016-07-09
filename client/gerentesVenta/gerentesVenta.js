angular
.module("casserole")
.controller("GerentesVentaCtrl", GerentesVentaCtrl);
function GerentesVentaCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {
	
	let rc = $reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;  
  
	this.subscribe('gerentesVenta');
 
  this.helpers({
	  gerentesVenta : () => {
		  var usuarios = Meteor.users.find().fetch();
		  var gerentes = [];
		  _.each(usuarios, function(usuario){
			  console.log(usuario);
			  if(usuario.roles[0] == "gerenteVenta"){
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
		console.log(gerenteVenta);
		gerenteVenta.profile.estatus = true;
		Meteor.call('createGerenteVenta', gerenteVenta, 'gerenteVenta');
		toastr.success('Gerente de Venta Guardado.');
		this.nuevo = true;
		this.gerenteVenta = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;		
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
		Meteor.call('updateGerenteVenta', gerenteVenta, 'gerenteVenta');
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
		
	this.tomarFoto = function(){
		$meteor.getPicture({width:200, height: 200, quality: 50}).then(function(data){
			rc.gerenteVenta.profile.fotografia = data;
		});
	};
};