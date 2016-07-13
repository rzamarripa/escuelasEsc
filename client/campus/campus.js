angular.module("casserole")
.controller("CampusCtrl", CampusCtrl);  
 function CampusCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;

	this.subscribe('campus', function(){
		return [{
			estatus : true
		}]
	});

	this.helpers({
	  campuses : () => {
		  return Campus.find();
	  }
  });

  this.nuevoCampus = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.campus = {};		
  };
  
  this.guardar = function(campus,form)
	{
		if(form.$invalid){
      toastr.error('Error al guardar los datos del Campus.');
      return;
	  }
		this.campus.estatus = true;
		console.log(this.campus);
		Campus.insert(this.campus);
		toastr.success('campus guardado.');
		this.campus = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
    form.$setUntouched();
    //Bert.alert( 'Campus Guardado', 'success','growl-top-right');
		//$state.go('root.campus')
	};
	
	this.editar = function(id)
	{
    this.campus = Campus.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(campus,form)
	{
		if(form.$invalid){
	        toastr.error('Error al actualizar los datos del Campus.');
	        return;
	    }
		var idTemp = campus._id;
		delete campus._id;		
		Campus.update({_id:idTemp},{$set:campus});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
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
