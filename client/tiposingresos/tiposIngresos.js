angular
  .module('casserole')
  .controller('TiposIngresosCtrl', TiposIngresosCtrl);
 
function TiposIngresosCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
	this.subscribe('tiposingresos')
	this.action = true;	
	
	
  this.helpers({
	  tiposingresos : () => {
		  return TiposIngresos.find();
	  }
  });
this.nuevo = true;
	
	this.nuevoTipoIngresos = function()
	{
		this.action = true;
    this.nuevo = !this.nuevo;
    this.tipoingreso = {}; 
	};
	
	this.guardar = function(tipoingreso)
	{
		this.tipoingreso.estatus = true;
		console.log(this.tipoingreso);
		TiposIngresos.insert(this.tipoingreso);
		toastr.success('TipoIngreso guardado.');
		this.tipoingreso = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.tiposingresos');
	};
	
	this.editar = function(id)
	{
		this.tipoingreso = TiposIngresos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
    
	};
	
	this.actualizar = function(tipoingreso)
	{
		var idTemp = tipoingreso._id;
		delete tipoingreso._id;		
		TiposIngresos.update({_id:idTemp},{$set:tipoingreso});
		$('.collapse').collapse('hide');
		this.nuevo = true;	};
	
	this.cambiarEstatus = function(id)
	{
		var tipoingreso = TiposIngresos.findOne({_id:id});
		if(tipoingreso.estatus == true)
			tipoingreso.estatus = false;
		else
			tipoingreso.estatus = true;
		
		TiposIngresos.update({_id:id}, {$set : {estatus : tipoingreso.estatus}});

	};
	
}