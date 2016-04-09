angular
  .module('casserole')
  .controller('CivilesCtrl', CivilesCtrl);
 
function CivilesCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);

  this.subscribe("civiles");
  this.action = true;  
  this.nuevo = true;
  
  this.helpers({
	  civiles : () => {
		  return Civiles.find();
	  }
  });

  this.nuevoCivil = function()
  {
   	this.action = true;
    this.nuevo = !this.nuevo;
    this.civil = {}; 
    
  };
  
 this.guardar = function(civil)
	{
		this.civil.estatus = true;
		console.log(this.civil);
		Civiles.insert(this.civil);
		toastr.success('Estado guardado.');
		this.civil = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.civiles');
		
	};
	
	this.editar = function(id)
	{
		this.civil = Civiles.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
		
	};
	
	this.actualizar = function(civil)
	{
		var idTemp = civil._id;
		delete civil._id;		
		Civiles.update({_id:idTemp},{$set:civil});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		
	};
		
    this.cambiarEstatus = function(id)
	{
		var civil = Civiles.findOne({_id:id});
		if(civil.estatus == true)
			civil.estatus = false;
		else
			civil.estatus = true;
		
		Civiles.update({_id:id}, {$set : {estatus : civil.estatus}});
		
	};
}