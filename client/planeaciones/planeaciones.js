angular
  .module('casserole')
  .controller('PlaneacionesCtrl', PlaneacionesCtrl);
 
function PlaneacionesCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
	this.action = true; 
	
	this.subscribe("planeaciones",()=>{
		return [{seccion_id : Meteor.user() != undefined ? Meteor.user().profile.seccion_id : "" }]
	 });
	this.subscribe("deptosAcademicos",()=>{
		return [{estatus:true, seccion_id : Meteor.user() != undefined ? Meteor.user().profile.seccion_id : "" }]
	 });

  this.helpers({
	  planeaciones : () => {
		  return Planeaciones.find();
	  },
		deptosAcademicos : () => {
		  return DeptosAcademicos.find();
	  }	  
  });
    
  this.nuevo = true;
  this.nuevaPlaneacion = function()
  {
	   	this.action = true;
	    this.nuevo = !this.nuevo;
	    this.planeacion = {};
    
  };
/*
  this.submit = function(){
  		console.log("entro al submit");
  		this.submitted=true;
  		console.log(this.validForm);
  		if(this.validForm)
  			this.guardar(this.planeacion)
  }
*/
  
  this.guardar = function(planeacion,form)
	{
			if(form.$invalid){
	      toastr.error('Error al guardar los datos.');
	      return;
		  }
			planeacion.estatus = true;
			planeacion.campus_id = Meteor.user().profile.campus_id;
			planeacion.seccion_id = Meteor.user().profile.seccion_id;
			planeacion.usuarioInserto = Meteor.userId();
			Planeaciones.insert(this.planeacion);
			toastr.success('Guardado correctamente.');
			this.planeacion = {};
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
	};
	
	this.editar = function(id)
	{
	    this.planeacion = Planeaciones.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(planeacion,form)
	{
			if(form.$invalid){
		        toastr.error('Error al actualizar los datos.');
		        return;
		  }
			var idTemp = planeacion._id;
			delete planeacion._id;		
			planeacion.usuarioActualizo = Meteor.userId(); 
			Planeaciones.update({_id:idTemp},{$set:planeacion});
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();	
	};
		
	this.cambiarEstatus = function(id)
	{
			var planeacion = Planeaciones.findOne({_id:id});
			if(planeacion.estatus == true)
				planeacion.estatus = false;
			else
				planeacion.estatus = true;
			
			Planeaciones.update({_id:id}, {$set : {estatus : planeacion.estatus}});

	};
	
	this.getDeptoAcademico = function(depto_id){
			var depto = Departamentos.findOne(DeptosAcademicos, depto_id, false);
			return depto.descripcion;
	};
	
}