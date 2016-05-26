angular
  .module('casserole')
  .controller('NacionalidadesCtrl', NacionalidadesCtrl);
 
function NacionalidadesCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);

  this.subscribe("nacionalidades");
  this.action = true;  
  this.helpers({
	  nacionalidades : () => {
		  return Nacionalidades.find();
	  }
  });
	this.nuevo = true;
	
  this.nuevoNacionalidad = function()
  {
   this.action = true;
    this.nuevo = !this.nuevo;
    this.nacionalidad = {}; 
  };
  
   this.guardar = function(nacionalidad)
	{
		this.nacionalidad.estatus = true;
		console.log(this.nacionalidad);
		Nacionalidades.insert(this.nacionalidad);
		toastr.success('Nacionalidad guardado.');
		this.nacionalidad = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		
	};
	
	this.editar = function(id)
	{
		this.nacionalidad = Nacionalidades.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
		
	};
	
	this.actualizar = function(nacionalidad)
	{
		var idTemp = nacionalidad._id;
		delete nacionalidad._id;		
		Nacionalidades.update({_id:idTemp},{$set:nacionalidad});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		
	};
		
	this.cambiarEstatus = function(id)
	{
		var nacionalidad = Nacionalidades.findOne({_id:id});
		if(nacionalidad.estatus == true)
			nacionalidad.estatus = false;
		else
			nacionalidad.estatus = true;
		
		Nacionalidades.update({_id:id}, {$set : {estatus : nacionalidad.estatus}});
		
	};
}