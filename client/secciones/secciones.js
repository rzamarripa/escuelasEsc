angular
  .module('casserole')
  .controller('SeccionesCtrl', SeccionesCtrl);
 
function SeccionesCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {
	let rc = $reactive(this).attach($scope);

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
  $('.collapse').collapse('show');
  
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
		  return Campus.findOne();
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
		this.seccion.campus_id = $stateParams.campus_id;

		seccion_id = Secciones.insert(this.seccion);
		var nombre = seccion.nombre != undefined ? seccion.nombre + " " : "";
		var apPaterno = seccion.apPaterno != undefined ? seccion.apPaterno + " " : "";
		var apMaterno = seccion.apMaterno != undefined ? seccion.apMaterno : ""
		seccion.nombreCompleto = nombre + apPaterno + apMaterno;
		var usuario = {
			username : seccion.username,
			password : seccion.password,
			profile : {
				nombre : seccion.nombre,
				apPaterno : seccion.apPaterno,
				apMaterno : seccion.apMaterno,
				nombreCompleto : nombre + apPaterno + apMaterno,
				campus_id : $stateParams.campus_id,
				campus_clave : rc.campus.clave,
				seccion_id : seccion_id,
				estatus : true
			}
		}

		Meteor.call('createGerenteVenta', usuario, 'director');
				console.log(this.seccion);
				console.log(usuario);
		
		toastr.success('Sección guardado.');
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
		console.log(rc.campus);
		var idTemp = seccion._id;
		delete seccion._id;		
		Secciones.update({_id:idTemp},{$set:seccion});
		var nombre = seccion.nombre != undefined ? seccion.nombre + " " : "";
		var apPaterno = seccion.apPaterno != undefined ? seccion.apPaterno + " " : "";
		var apMaterno = seccion.apMaterno != undefined ? seccion.apMaterno : ""
		seccion.nombreCompleto = nombre + apPaterno + apMaterno;
		var usuario = {
			username : seccion.username,
			password : seccion.password,
			profile : {
				nombre : seccion.nombre,
				apPaterno : seccion.apPaterno,
				apMaterno : seccion.apMaterno,
				nombreCompleto : nombre + apPaterno + apMaterno,
				campus_id : $stateParams.campus_id,
				campus_clave : rc.campus.clave,
				seccion_id : seccion_id,
				estatus : true
			}
		}
		Meteor.call('updateGerenteVenta', usuario, 'director');
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