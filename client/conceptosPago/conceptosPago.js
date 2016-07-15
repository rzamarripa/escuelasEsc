angular
  .module('casserole')
  .controller('ConceptosPagoCtrl', ConceptosPagoCtrl);
 
function ConceptosPagoCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('conceptosPago',()=>{
		return [{estatus:true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : ""}]
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
	
  this.guardar = function(conceptoPago,form)
	{
		if(form.$invalid){
	        toastr.error('Error al guardar los datos de Pago.');
	        return;
	    }
		conceptoPago.estatus = true;
		this.conceptoPago.campus_id = Meteor.user().profile.campus_id;
		console.log(this.conceptoPago);
		ConceptosPago.insert(this.conceptoPago);
		toastr.success('Concepto de Pago guardado.');
		this.conceptoPago = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
	};
	
	this.editar = function(id)
	{
    this.conceptoPago = ConceptosPago.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(conceptoPago,form)
	{
		if(form.$invalid){
	        toastr.error('Error al actualizar los datos de Pago.');
	        return;
	    }
		var idTemp = conceptoPago._id;
		delete conceptoPago._id;		
		ConceptosPago.update({_id:idTemp},{$set:conceptoPago});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
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