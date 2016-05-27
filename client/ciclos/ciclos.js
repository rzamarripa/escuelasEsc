angular
  .module('casserole')
  .controller('CiclosCtrl', CiclosCtrl);
 
function CiclosCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('ciclos',()=>{
		return [{estatus:true}]
	 });
  
  this.helpers({
	  ciclos : () => {
		  return Ciclos.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoCiclo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.ciclo = {};		
  };
	
  this.guardar = function(ciclo)
	{
		this.ciclo.estatus = true;
		console.log(this.ciclo);
		Ciclos.insert(this.ciclo);
		toastr.success('Ciclo guardado.');
		this.ciclo = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.ciclos');
	};
	
	this.editar = function(id)
	{
    this.ciclo = Ciclos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(ciclo)
	{
		var idTemp = ciclo._id;
		delete ciclo._id;		
		Ciclos.update({_id:idTemp},{$set:ciclo});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
		
	this.cambiarEstatus = function(id)
	{
		var ciclo = Ciclos.findOne({_id:id});
		if(ciclo.estatus == true)
			ciclo.estatus = false;
		else
			ciclo.estatus = true;
		
		Ciclos.update({_id:id}, {$set : {estatus : ciclo.estatus}});
	};
	
};