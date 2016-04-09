angular
  .module('casserole')
  .controller('OcupacionesCtrl', OcupacionesCtrl);
 
function OcupacionesCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);

	this.subscribe("ocupaciones");
	this.action = true;
	this.helpers({
			ocupaciones : () => {
				return Ocupaciones.find();
			}
	})
	this.nuevo = true;
	this.nuevaOcupacion = function()
	{
		  this.action = true;
      this.nuevo = !this.nuevo;
      this.ocupacion = {}; 
	};
	
	this.guardar = function(ocupacion)
	{
		this.ocupacion.estatus = true;
		console.log(this.ocupacion);
		Ocupaciones.insert(this.ocupacion);
		toastr.success('cupacion guardado.');
		this.ocupacion = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.ocupacion');
	};
	
	this.editar = function(id)
	{
		this.ocupacion = Ocupaciones.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;

	};
	
	this.actualizar = function(ocupacion)
	{
		var idTemp = ocupacion._id;
		delete ocupacion._id;		
		Ocupaciones.update({_id:idTemp},{$set:ocupacion});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	
	this.cambiarEstatus = function(id)
	{
		var ocupacion = Ocupaciones.findOne({_id:id});
		if(ocupacion.estatus == true)
			ocupacion.estatus = false;
		else
			ocupacion.estatus = true;
		
		Ocupaciones.update({_id:id}, {$set : {estatus : ocupacion.estatus}});

	};
	
}