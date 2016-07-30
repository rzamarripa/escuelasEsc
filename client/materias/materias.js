angular
  .module('casserole')
  .controller('MateriasCtrl', MateriasCtrl);
 
function MateriasCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
	this.action = true; 
	
	this.subscribe("materias",()=>{
		return [{estatus:true, seccion_id : Meteor.user() != undefined ? Meteor.user().profile.seccion_id : "" }]
	 });
	this.subscribe("deptosAcademicos",()=>{
		return [{estatus:true, seccion_id : Meteor.user() != undefined ? Meteor.user().profile.seccion_id : "" }]
	 });

   
    
  this.helpers({
	  materias : () => {
		  return Materias.find();
	  },
		deptosAcademicos : () => {
		  return DeptosAcademicos.find();
	  }
		
	  
  });
    

	
  this.nuevo = true;
  this.nuevaMateria = function()
  {
   	this.action = true;
    this.nuevo = !this.nuevo;
    this.materia = {};
    
  };
/*
  this.submit = function(){
  		console.log("entro al submit");
  		this.submitted=true;
  		console.log(this.validForm);
  		if(this.validForm)
  			this.guardar(this.materia)

  }
*/
  

  
  	this.guardar = function(materia,form)
	{
		if(form.$invalid){
      toastr.error('Error al guardar los datos de la Materia.');
      return;
	  }
		this.materia.estatus = true;
		this.materia.campus_id = Meteor.user().profile.campus_id;
		this.materia.seccion_id = Meteor.user().profile.seccion_id;
		Materias.insert(this.materia);
		toastr.success('Materia guardada.');
		this.materia = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
    form.$setUntouched();
	};
	
	this.editar = function(id)
	{
	    this.materia = Materias.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(materia,form)
	{
		if(form.$invalid){
	        toastr.error('Error al actualizar los datos de la Materia.');
	        return;
	    }
		var idTemp = materia._id;
		delete materia._id;		
		Materias.update({_id:idTemp},{$set:materia});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
		
	};
		
	this.cambiarEstatus = function(id)
	{
		var materia = Materias.findOne({_id:id});
		if(materia.estatus == true)
			materia.estatus = false;
		else
			materia.estatus = true;
		
		Materias.update({_id:id}, {$set : {estatus : materia.estatus}});

	};
	
	this.getDeptoAcademico = function(depto_id){
		var depto = Departamentos.findOne(DeptosAcademicos, depto_id, false);
		return depto.descripcion;
	};
	
}