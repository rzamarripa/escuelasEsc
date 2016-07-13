angular
  .module('casserole')
  .controller('CivilesCtrl', CivilesCtrl);
 
function CivilesCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);

  this.subscribe("civiles",()=>{
		return [{estatus:true, campus_id : Meteor.user().profile.campus_id }]
	 });

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
  
 this.guardar = function(civil,form)
	{
		
		if(form.$invalid){
	        toastr.error('Error al guardar los datos del Estado Civil.');
	        return;
	    }
		this.civil.estatus = true;
		this.civil.campus_id = Meteor.user().profile.campus_id;
		Civiles.insert(this.civil);
		toastr.success('Estado guardado.');
		this.civil = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
		$state.go('root.estadoCivil');
		
	};
	
	this.editar = function(id)
	{
		this.civil = Civiles.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
		
	};
	
	this.actualizar = function(civil,form)
	{
		if(form.$invalid){
	        toastr.error('Error al actualizar los datos del Estado Civil.');
	        return;
	    }
		var idTemp = civil._id;
		delete civil._id;		
		Civiles.update({_id:idTemp},{$set:civil});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
		
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