angular
  .module('casserole')
  .controller('MateriasCtrl', MateriasCtrl);
 
function MateriasCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);

	this.subscribe("materias");
	this.subscribe("deptosAcademicos");
	
	this.helpers({
		deptosAcademicos : () => {
			return DeptosAcademicos.find();
		},
		materias : () => {
			var materiasEncontradas = Materias.find().fetch();
			_.each(materiasEncontradas, function(materia){
				materia.deptoAcademico = DeptosAcademicos.findOne(materias.deptoAcademico_id);
			});
		  return materiasEncontradas;
		}
	});

  this.action = true; 
  this.nuevo = true; 
    
  $(document).ready(function() {
	  $(".select2").select2();
	});   

  this.nuevaMateria = function()
  {
   	this.action = true;
    this.nuevo = !this.nuevo;
    this.materia = {};
    
  };
  
  this.guardar = function(materia)
	{
		this.materia.estatus = true;
		Materias.insert(materia);
		toastr.success('Materia guardada.');
		this.materia = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	
	this.editar = function(id)
	{
    this.materia = Materias.findOne(id);
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
		var materia = Materias.findOne(id);
		if(materia.estatus == true)
			materia.estatus = false;
		else
			materia.estatus = true;
		
		Materias.update({_id:id},{$set:{estatus: materia.estatus}});
	};
	
	
	
};