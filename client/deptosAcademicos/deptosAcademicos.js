angular
  .module('casserole')
  .controller('DeptosAcademicosCtrl', DeptosAcademicosCtrl);
 
function DeptosAcademicosCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true  
  
  this.subscribe("deptosAcademicos",()=>{
		return [{estatus:true, campus_id : Meteor.user().profile.campus_id != undefined ? Meteor.user().profile.campus_id : "" }]
	 });

  this.helpers({
	  deptosAcademicos : () => {
		  return DeptosAcademicos.find();
	  }
  });
	
  this.nuevoDeptoAcademico = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.deptoAcademico = {};
  };
  
  	this.guardar = function(deptoAcademico,form)
	{
		if(form.$invalid){
	        toastr.error('Error al guardar los datos del Departamento Académico.');
	        return;
	    }

		this.deptoAcademico.estatus = true;
		this.deptoAcademico.campus_id = Meteor.user().profile.campus_id;
		DeptosAcademicos.insert(deptoAcademico);
		toastr.success('Departamento guardado.');
		this.deptoAcademico = {};
	    $('.collapse').collapse('hide');
        this.nuevo = true;
        form.$setPristine();
        form.$setUntouched();
	};
	
	this.editar = function(id)
	{
	    this.deptoAcademico = DeptosAcademicos.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(deptoAcademico,form)
	{		
		if(form.$invalid){
	        toastr.error('Error al actualizar los datos del Departamento Académico.');
	        return;
	    }
		var idTemp = deptoAcademico._id;
		delete deptoAcademico._id;		
		DeptosAcademicos.update({_id:idTemp},{$set:deptoAcademico});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
	};
		
	this.cambiarEstatus = function(id)
	{
		var deptoAcademico = DeptosAcademicos.findOne({_id:id});
		if(deptoAcademico.estatus == true)
			deptoAcademico.estatus = false;
		else
			deptoAcademico.estatus = true;
		
		DeptosAcademicos.update({_id:id}, {$set : {estatus : deptoAcademico.estatus}});
	};
	
}