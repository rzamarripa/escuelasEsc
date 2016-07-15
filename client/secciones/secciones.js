angular
  .module('casserole')
  .controller('SeccionesCtrl', SeccionesCtrl);
 
function SeccionesCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);

  this.subscribe("secciones",()=>{
		return [{estatus:true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	 });
  this.subscribe("deptosAcademicos",()=>{
		return [{estatus:true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	 });
  this.subscribe("turnos",()=>{
		return [{estatus:true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	 });
  this.subscribe("campus",()=>{
		return [{estatus:true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	 });
  this.action = true;  
  this.nuevo = true;
  
  this.helpers({
	  secciones : () => {
		  return Secciones.find();
	  },
	   deptosAcademicos : () => {
		  return DeptosAcademicos.find();
	  },
	   turnos : () => {
		  return Turnos.find();
	  },
	   campus : () => {
		  return Campus.find();
	  }
  });

 
  this.getDeptoAcademico = function(id)
  { 
  	var depto = $meteor.object(DeptosAcademicos, id, false);
  	return depto.descripcionCorta; 
  }; 
  
  this.getCampus = function(id)
  { 
  	var campus = $meteor.object(Campus, id, false);
  	return campus.nombre; 
  }; 
	
  this.nuevoSeccion = function()
  {
     this.action = true;
    this.nuevo = !this.nuevo;
    this.seccion = {}; 
  };
  
  this.guardar = function(seccion,form)
	{
		if(form.$invalid){
	        toastr.error('Error al guardar los datos de la Sección.');
	        return;
	    }
		this.seccion.estatus = true;
		console.log(this.seccion);
		Secciones.insert(this.seccion);
		toastr.success('Seccion guardado.');
		this.seccion = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
		$state.go('root.secciones');
		
	};
	
	this.editar = function(id)
	{
		this.seccion = Secciones.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
		
	};
	
	this.actualizar = function(seccion,form)
	{
		if(form.$invalid){
	        toastr.error('Error al actualizar los datos de la Sección.');
	        return;
	    }
		console.log(seccion);
		var idTemp = seccion._id;
		delete seccion._id;		
		Secciones.update({_id:idTemp},{$set:seccion});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
		
	};

	this.cambiarEstatus = function(id)
	{
		var seccion = Secciones.findOne({_id:id});
		if(seccion.estatus == true)
			seccion.estatus = false;
		else
			seccion.estatus = true;
		
		Secciones.update({_id:id}, {$set : {estatus : seccion.estatus}});
		
    };
		
}