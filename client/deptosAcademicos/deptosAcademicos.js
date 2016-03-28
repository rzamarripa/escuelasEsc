angular
  .module('casserole')
  .controller('DeptosAcademicosCtrl', DeptosAcademicosCtrl);
 
function DeptosAcademicosCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);

  rc.action = true;
  rc.nuevo = true  
  
  rc.subscribe("deptosAcademicos");
  
  rc.helpers({
	  deptosAcademicos : () => {
		  return DeptosAcademicos.find();
	  }
  });
	
  rc.nuevoDeptoAcademico = function()
  {
    rc.action = true;
    rc.nuevo = !rc.nuevo;
    rc.deptoAcademico = {};
  };
  
  rc.guardar = function(deptoAcademico)
	{
		rc.deptoAcademico.estatus = true;
		DeptosAcademicos.insert(deptoAcademico);
		toastr.success('Departamento guardado.');
		rc.deptoAcademicos = {};
	  $('.collapse').collapse('show');
    rc.nuevo = true;
	};
	
	rc.editar = function(id)
	{
    rc.deptoAcademico = DeptosAcademicos.findOne({_id:id});
    rc.action = false;
    $('.collapse').collapse('show');
    rc.nuevo = false;
	};
	
	rc.actualizar = function(deptoAcademico)
	{		
		var idTemp = deptoAcademico._id;
		delete deptoAcademico._id;		
		DeptosAcademicos.update({_id:idTemp},{$set:deptoAcademico});
		$('.collapse').collapse('hide');
		rc.nuevo = true;
	};
		
	rc.cambiarEstatus = function(id)
	{
		var deptoAcademico = DeptosAcademicos.findOne({_id:id});
		if(deptoAcademico.estatus == true)
			deptoAcademico.estatus = false;
		else
			deptoAcademico.estatus = true;
		
		DeptosAcademicos.update({_id:id}, {$set : {estatus : deptoAcademico.estatus}});
	};
	
}