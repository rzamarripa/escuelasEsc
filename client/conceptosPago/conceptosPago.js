angular
  .module('casserole')
  .controller('ConceptosPagoCtrl', ConceptosPagoCtrl);
 
function ConceptosPagoCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('conceptosPago',()=>{
		return [{estatus:true}]
	 });
  
  this.helpers({
	  conceptosPago : () => {
		  return ConceptosPago.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoConcepto = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.conceptoPago = {};		
  };
	
  this.guardar = function(conceptoPago)
	{
		conceptoPago.estatus = true;
		console.log(this.conceptoPago);
		ConceptosPago.insert(this.conceptoPago);
		toastr.success('Concepto de Pago guardado.');
		this.conceptoPago = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	
	this.editar = function(id)
	{
    this.conceptoPago = ConceptosPago.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(conceptoPago)
	{
		var idTemp = conceptoPago._id;
		delete conceptoPago._id;		
		ConceptosPago.update({_id:idTemp},{$set:conceptoPago});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
		
	this.cambiarEstatus = function(id)
	{
		var conceptoPago = ConceptosPago.findOne({_id:id});
		if(conceptoPago.estatus == true)
			conceptoPago.estatus = false;
		else
			conceptoPago.estatus = true;
		
		ConceptosPago.update({_id:id}, {$set : {estatus : conceptoPago.estatus}});
	};
	
};