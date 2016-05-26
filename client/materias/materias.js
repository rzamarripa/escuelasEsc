angular
  .module('casserole')
  .controller('MateriasCtrl', MateriasCtrl);
 
function MateriasCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
	this.action = true; 
	
	this.subscribe("materias");
	this.subscribe("deptosAcademicos");
	this.subscribe("ocupaciones");
    
   
    
  this.helpers({
	  materias : () => {
		  return Materias.find();
	  },
		deptosAcademicos : () => {
		  return DeptosAcademicos.find();
	  },
		ocupaciones : () => {
		  return Ocupaciones.find();
	  },
	  
  });
    
  $(document).ready(function() {
	  $(".select2").select2();
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
  

  
  this.guardar = function(materia)
	{
		this.materia.estatus = true;
		console.log(this.materia);
		Materias.insert(this.materia);
		toastr.success('Materia guardada.');
		this.materia = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;		
	};
	
	this.editar = function(id)
	{
    this.materia = Materias.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(materia)
	{
		var idTemp = materia._id;
		delete materia._id;		
		Materias.update({_id:idTemp},{$set:materia});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		
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