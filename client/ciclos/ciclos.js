angular
  .module('casserole')
  .controller('CiclosCtrl', CiclosCtrl);
 
function CiclosCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('ciclos',()=>{
		return [{estatus:true, seccion_id : Meteor.user() != undefined ? Meteor.user().profile.seccion_id : "",  }]
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
	
  this.guardar = function(ciclo,form)
	{
		if(form.$invalid){
      toastr.error('Error al guardar los datos del Ciclo.');
      return;
    }
		
		this.ciclo.estatus = true;
		this.ciclo.campus_id = Meteor.user().profile.campus_id;
		this.ciclo.seccion_id = Meteor.user().profile.seccion_id;
		console.log(this.ciclo);
		Ciclos.insert(this.ciclo);
		toastr.success('Ciclo guardado.');
		this.ciclo = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.ciclos');
		form.$setPristine();
        form.$setUntouched();
	};
	
	this.editar = function(id)
	{
	    this.ciclo = Ciclos.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(ciclo,form)
	{
	    if(form.$invalid){
	        toastr.error('Error al actualizar los datos del Ciclo.');
	        return;
	    }
		var idTemp = ciclo._id;
		delete ciclo._id;		
		Ciclos.update({_id:idTemp},{$set:ciclo});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
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