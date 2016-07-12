angular.module("casserole")
.controller("CampusDetalleCtrl", CampusDetalleCtrl);  
 function CampusDetalleCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;

	this.subscribe('campus', function(){
		return [{
			_id : $stateParams.id
		}]
	});

	this.helpers({
	  campusDetalle : () => {		  
		  return Campus.findOne();
	  }
  });
  
  this.guardar = function(campusDetalle,form)
	{
		
		console.log(campusDetalle);
		if(form.$invalid){
      toastr.error('No se pudo guardar la información del Campus.');
      return;
		}

		Campus.update({ _id : $stateParams.id }, { $set : campusDetalle } );
		var nombre = campusDetalle.detalle.nombre != undefined ? campusDetalle.detalle.nombre + " " : "";
		var apPaterno = campusDetalle.detalle.apPaterno != undefined ? campusDetalle.detalle.apPaterno + " " : "";
		var apMaterno = campusDetalle.detalle.apMaterno != undefined ? campusDetalle.detalle.apMaterno : ""
		campusDetalle.detalle.nombreCompleto = nombre + apPaterno + apMaterno;
		var usuario = {
			username : campusDetalle.detalle.username,
			password : campusDetalle.detalle.password,
			profile : {
				nombre : campusDetalle.detalle.nombre,
				apPaterno : campusDetalle.detalle.apPaterno,
				apMaterno : campusDetalle.detalle.apMaterno,
				nombreCompleto : nombre + apPaterno + apMaterno,
				campus_id : $stateParams.id,
				estatus : true
			}
		}
		console.log(campusDetalle);
		Meteor.call('createGerenteVenta', usuario, 'director');
		toastr.success('Se ha guardado la información del Campus correctamente.');
		this.campusDetalle = {}; 
		this.nuevo = true;
		form.$setPristine();
    form.$setUntouched();
	};
	
	this.editar = function(id)
	{
    this.campus = Campus.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(campus)
	{
		var idTemp = campus._id;
		delete campus._id;		
		Campus.update({_id:idTemp},{$set:campus});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var campus = Campus.findOne({_id:id});
		if(campus.estatus == true)
			campus.estatus = false;
		else
			campus.estatus = true;
		
		Campus.update({_id: id},{$set :  {estatus : campus.estatus}});
  };
		
};
