angular.module("casserole")
.controller("EtapasVentaCtrl", EtapasVentaCtrl);  
 function EtapasVentaCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	
	this.subscribe('etapasVenta', function(){
		return [{estatus:true, campus_id : Meteor.user().profile.campus_id}];
	});

	this.helpers({
	  etapasVenta : () => {
		  return EtapasVenta.find();
	  }
	 
  });
  	  
  this.nuevo = true;	  
  this.nuevoEtapaVenta = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.etapaVenta = {};		
  };
  //TODO me quedé haciendo la etapa de venta para mostrar el formulario del prospecto
  //TODO me quedé haciendo el detalle del prospecto
  this.guardar = function(etapaVenta)
	{
		this.etapaVenta.estatus = true;
		console.log(this.etapaVenta);
		etapaVenta.campus_id = Meteor.user().profile.campus_id;
		EtapasVenta.insert(this.etapaVenta);
		toastr.success('Etapa de Venta guardada.');
		this.etapaVenta = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	
	this.editar = function(id)
	{
    this.etapaVenta = EtapasVenta.findOne({_id:id});
    this.action = false;
    $('.collapse').coll
    this.nuevo = false;
	};
	
	this.actualizar = function(etapaVenta)
	{
		var idTemp = etapaVenta._id;
		delete etapaVenta._id;		
		EtapasVenta.update({_id:idTemp},{$set:etapaVenta});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var etapaVenta = etapaVentas.findOne({_id:id});
		if(etapaVenta.estatus == true)
			etapaVenta.estatus = false;
		else
			etapaVenta.estatus = true;
		
		EtapasVenta.update({_id: id},{$set :  {estatus : etapaVenta.estatus}});
  };
		
};
