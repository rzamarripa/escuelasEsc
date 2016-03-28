angular.module("casserole")
.controller("AulasCtrl" , AulasCtrl);  

function AulasCtrl ($scope, $meteor, $reactive , $state, $stateParams, toastr) {
	let rc = $reactive(this).attach($scope);
    rc.action = true;    
	rc.subscribe('aulas');

  rc.helpers({
	  aulas : () => {
		  return Aulas.find();
	  }
  }); 

  
  rc.action = true;  
  rc.nuevo = true;
  
   rc.nuevoAula = function()
  {
    rc.action = true;
    rc.nuevo = !rc.nuevo;
    rc.aula = {}; 
 
  };
  
   rc.guardar = function(aula)
	{
	    rc.aula.estatus = true;
		rc.aulas.save(aula);
		Aulas.insert(rc.ciclo);
		toastr.success('Aula guardada.');
		rc.aula = {};
		$('.collapse').collapse('show');
		rc.nuevo = true;
		state.go('root.aulas');
	};
	
	 rc.editar = function(id)
	{
    rc.aula = Aulas.finOne(Aulas, id, false);
    rc.action = false;
    $('.collapse').collapse('show');
    rc.nuevo = false;
	};
	
	rc.actualizar = function(aula)
	{
		var idTemp = aula_id;
		delete aula._id;
		Aulas.update({_id:idTemp},{$set:aula});
		rc.aula.save();
		$('.collapse').collapse('hide');
		rc.nuevo = true;
	};
		
	rc.cambiarEstatus = function(id)
	{
		var aula = Aulas.findOne({_id:id});
		if(aula.estatus == true)
			aula.estatus = false;
		else
		aula.estatus = true;
		
		Aulas.update({_id:id}, {$set : {estatus : aula.estatus}});
	};
	   //  $scope.remove = function(empresa)
       // {
       //     $scope.empresa.estatus = false;
       //     $scope.empresas.save(empresa);
       // };
};
	
