angular
.module("casserole")
.controller("VendedoresCtrl", VendedoresCtrl);
function VendedoresCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {
	
	let rc = $reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;  
  
	this.subscribe('vendedores',()=>{
		return [{estatus:true, campus_id : this.getReactively('Meteor.user().profile.campus_id') }]
	 });
 
  this.helpers({
	  vendedores : () => {
		  var usuarios = Meteor.users.find().fetch();
		  var vendedores = [];
		  _.each(usuarios, function(usuario){
			  if(usuario.roles[0] == "vendedor" && usuario.profile.campus_id == this.getReactively('Meteor.user().profile.campus_id') ){
				  vendedores.push(usuario);
			  }
		  });
		  return vendedores;
	  },
	  gerentesVenta : () => {
		  var usuarios = Meteor.users.find().fetch();
		  var gerentes = [];
		  _.each(usuarios, function(usuario){
			  if(usuario.roles[0] == "gerenteVenta" && usuario.profile.campus_id == this.getReactively('Meteor.user().profile.campus_id')){
				  gerentes.push(usuario);
			  }
		  });
		  return gerentes;
	  }
  });  
  
  this.nuevoVendedor = function()
  {
		this.action = true;
    this.nuevo = !this.nuevo;
    this.vendedor = {}; 
    this.vendedor.profile = {};
  };
 
	this.guardar = function(vendedor)
	{		
		console.log(vendedor);
		vendedor.profile.estatus = true;
		vendedor.profile.campus_id = Meteor.user().profile.campus_id;
		Meteor.call('createGerenteVenta', vendedor, 'vendedor');
		toastr.success('Vendedor Guardado.');
		this.nuevo = true;
		this.vendedor = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;		
	};
	
	this.editar = function(id)
	{
    this.vendedor = Meteor.users.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(vendedor)
	{
		Meteor.call('updateGerenteVenta', vendedor, 'vendedor');
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
		
	this.tomarFoto = function(){
		$meteor.getPicture({width:200, height: 200, quality: 50}).then(function(data){
			rc.vendedor.profile.fotografia = data;
		});
	};
	
	this.getGerenteVenta = function(gerente_id){
		var gerente = Meteor.users.findOne({_id: gerente_id});
		if(gerente){
			return gerente.profile.nombre + " " + gerente.profile.apPaterno;
		}
			
	}
};