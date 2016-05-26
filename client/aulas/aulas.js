angular.module("casserole")
.controller("AulasCtrl", AulasCtrl);  
 function AulasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('aulas');

	this.helpers({
	  aulas : () => {
		  return Aulas.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoAula = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.aula = {};		
  };
  
  this.guardar = function(aula)
	{
		this.aula.estatus = true;
		console.log(this.aula);
		Aulas.insert(this.aula);
		toastr.success('aula guardada.');
		this.aula = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.aulas')
	};
	
	this.editar = function(id)
	{
    this.aula = Aulas.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(aula)
	{
		var idTemp = aula._id;
		delete aula._id;		
		Aulas.update({_id:idTemp},{$set:aula});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var aula = Aulas.findOne({_id:id});
		if(aula.estatus == true)
			aula.estatus = false;
		else
			aula.estatus = true;
		
		Aulas.update({_id: id},{$set :  {estatus : aula.estatus}});
    };
		
};
