angular.module("casserole")
.controller("ProspectosCtrl", ProspectosCtrl);  
 function ProspectosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope); 	
 	
  this.action = true;
  
  this.prospecto = {};
  
  this.prospecto.tipoComidasSeleccionadas = [];
  
  this.tipoComidas = [
    'Comida Mexicana',
    'Comida Mediterranea',
    'Comida Oriental',
    'Comida Internacional', 
    'Comida Vegetariana',
    'Repostería',
    'Enología y Coctelería'
  ];  
  
  
  this.buscar = {};
  this.buscar.nombre = '';

	this.subscribe('prospectos', () => {
    return [{
	    options : { limit: 10 },
	    where : { nombre : this.getReactively('buscar.nombre'), estatus : 2 }
    }] ;
  });
  
  this.subscribe("empleados");
  
  this.subscribe("etapaVenta", () =>{
	  return [{orden : "1", estatus : true, campus_id : this.getReactively("Meteor.user().profile.campus_id")}]
  });
  
  this.subscribe("etapaVenta", () =>{
	  return [{estatus : true, campus_id : this.getReactively("Meteor.user().profile.campus_id")}]
  });
  
  this.subscribe('prospecto', () => {
    return [{
	    id : $stateParams.id
    }];
  });
  
  this.helpers({
	  prospectos : () => {
		  return Prospectos.find();
	  },
	  etapaVenta : () => {
		  return EtapasVenta.findOne();
	  },
	  etapasVenta : () => {
		  return EtapasVenta.find();
	  }
  });
  
  this.guardar = function(prospecto)
	{
		this.prospecto.estatus = 1;
		this.prospecto.fecha = new Date();
		this.prospecto.etapaVenta_id = this.etapaVenta._id;
		this.prospecto.vendedor_id = Meteor.userId();
		var prospecto_id = Prospectos.insert(this.prospecto);
		toastr.success('prospecto guardado.');
		this.prospecto = {}; 
		$('.collapse').collapse('hide');
		$state.go('root.prospecto',{id : prospecto_id});
	};
	
	this.editar = function(id)
	{
    this.prospecto = Prospectos.findOne({_id:id});
    this.action = false;
    $('.collapse').coll
    this.nuevo = false;
	};
	
	this.actualizar = function(prospecto)
	{
		var idTemp = prospecto._id;
		delete prospecto._id;		
		Prospectos.update({_id:idTemp},{$set:prospecto});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	
	this.eliminar = function(prospecto){
		console.log(prospecto);
		Prospectos.remove({_id : prospecto._id});		
	}

	this.cambiarEstatus = function(id)
	{
		var prospecto = prospectos.findOne({_id:id});
		if(prospecto.estatus == true)
			prospecto.estatus = false;
		else
			prospecto.estatus = true;
		
		Prospectos.update({_id: id},{$set :  {estatus : prospecto.estatus}});
  };		
  
  this.getEtapaVenta = function(etapaVenta_id){
	  var etapaVenta = EtapasVenta.findOne(etapaVenta_id);
	  if(etapaVenta)
	  	return etapaVenta.nombre;
  }
};

