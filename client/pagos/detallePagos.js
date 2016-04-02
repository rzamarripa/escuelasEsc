angular
  .module('casserole')
  .controller('DetallePagosCtrl', DetallePagosCtrl);
 
function DetallePagosCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {
	$reactive(this).attach($scope);
	$(document).ready(function() {
	  $(".select2").select2();
	});
	
	window = this.pago;
	
  this.action = true;
  this.total = 0.00;
  this.totalPagado = 0.00;
  this.meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre', 'Noviembre','Diciembre'];
  this.semanas = [];
  for(var i = 1; i <= 52; i++){
	  this.semanas.push(i);
  }
  
  this.pagos = [];
  this.pago = {};

	this.subscribe('alumno', () => {
    return [{
	    id : $stateParams.id
    }];
  });
  
  this.subscribe('pagosAlumno', () => {
    return [{
	    alumno_id : $stateParams.id
    }];
  });
  
  this.helpers({
		alumno : () => {
			return Alumnos.findOne();
		},
	  misPagos : () => {
		  return Pagos.find().fetch();
	  }
  });
  
  this.agregar = function(){
	  this.total += parseFloat(this.pago.importe);
	  this.pagos.push(this.pago);
	  toastr.info('Agregó un pago');
	  this.pago = {};
  }
  
  this.eliminar = function(index, pago){
	  this.total -= parseFloat(this.pagos[index].importe);
	  this.pagos.splice(index, 1);
  }
  
  this.editar = function(pago){
	  this.pago = pago;
	  this.pago.semana = parseInt(pago.semana);
	  this.action = false;
  }
  
  this.actualizar = function(pago){
	  var idTemp = pago._id;
	  delete pago._id;
	  delete pago.$$hashKey;
	  Pagos.update(idTemp,{$set:pago});
	  toastr.info('Se ha modificado el pago.');
	  this.pago = {};
  }
  
  this.pagar = function(){
	  var miPago = {};
	  miPago.alumno_id = $stateParams.id;
	  miPago.fecha = new Date();
	  miPago.estatus = true;
	  miPago.usuario_id = Meteor.userId();
	  _.each(this.pagos, function(pago){
		  miPago.semana = pago.semana;
		  miPago.importe = pago.importe;
		  miPago.descripcion = pago.descripcion;
		  Pagos.insert(miPago);
	  });
	  toastr.info('Se han registrado los pagos.');
		this.pagos = [];
		this.pago = {};
  }
  
  this.totalPagado = function(){
	  var temp = 0.00;
	  _.each(this.misPagos, function(pago){	
		  temp += parseFloat(pago.importe);		
	  });
	  return temp;
  }
  
  this.imprimirPago = function(pago){
	  console.log(pago);
  }
  
};