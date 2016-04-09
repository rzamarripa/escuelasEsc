angular
  .module('casserole')
  .controller('PagosImprimirCtrl', PagosImprimirCtrl);
 
function PagosImprimirCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr) {
	$reactive(this).attach($scope);
  this.action = true;
  this.buscar = {};
  this.buscar.nombre = "";
  this.fecha = new Date();
  
  this.pago = $stateParams.pago;

	this.subscribe('alumno', () => {
    return [{
	    id : $stateParams.id
    }];
  });
  
  this.helpers({
		alumno : () => {
			return Alumnos.findOne();
		}
  });
  
  
};