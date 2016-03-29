angular.module("casserole")
.controller("CampusCtrl", CampusCtrl);  
 function CampusCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('campus');

	this.helpers({
	  campus : () => {
		  return Campus.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoCampus = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.campus = {};		
  };
  
  this.guardar = function(campus)
	{
		this.campus.estatus = true;
		console.log(this.campus);
		Campus.insert(this.campus);
		toastr.success('campus guardado.');
		this.campus = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.campus')
	};
	
	this.editar = function(id)
	{
    this.campus = Campus.findOne({_id:id});
    this.action = false;
    $('.collapse').coll
    this.nuevo = false;
	};
	
	this.actualizar = function(campus)
	{
		var idTemp = campus._id;
		delete campus._id;		
		Campus.update({_id:idTemp},{$set:campus});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var campus = Campus.findOne({_id:id});
		if(campus.estatus == true)
			campus.estatus = false;
		else
			campus.estatus = true;
		
		Campus.update({_id: id},{$set :  {estatus : campus.estatus}});
    };
		
};
