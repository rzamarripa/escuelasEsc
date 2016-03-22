angular
  .module('casserole')
  .controller('CiclosCtrl', CiclosCtrl);
 
function CiclosCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);
  rc.action = true;    
	rc.subscribe('ciclos');
  
  rc.helpers({
	  ciclos : () => {
		  return Ciclos.find();
	  }
  });
  	  
  rc.nuevo = true;	  
  rc.nuevoCiclo = function()
  {
    rc.action = true;
    rc.nuevo = !rc.nuevo;
    rc.ciclo = {};		
  };
	
  rc.guardar = function(ciclo)
	{
		rc.ciclo.estatus = true;
		console.log(rc.ciclo);
		Ciclos.insert(rc.ciclo);
		toastr.success('Ciclo guardado.');
		rc.ciclo = {};
		$('.collapse').collapse('show');
		rc.nuevo = true;
		state.go('root.ciclos');
	};
	
	rc.editar = function(id)
	{
    rc.ciclo = Ciclos.findOne({_id:id});
    rc.action = false;
    $('.collapse').collapse('show');
    rc.nuevo = false;
	};
	
	rc.actualizar = function(ciclo)
	{
		var idTemp = ciclo._id;
		delete ciclo._id;		
		Ciclos.update({_id:idTemp},{$set:ciclo});
		$('.collapse').collapse('hide');
		rc.nuevo = true;
	};
		
	rc.cambiarEstatus = function(id)
	{
		var ciclo = Ciclos.findOne({_id:id});
		if(ciclo.estatus == true)
			ciclo.estatus = false;
		else
			ciclo.estatus = true;
		
		Ciclos.update({_id:id}, {$set : {estatus : ciclo.estatus}});
	};
	
};