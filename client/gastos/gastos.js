angular
  .module('casserole')
  .controller('GastosCtrl', GastosCtrl);
 
function GastosCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
  this.tipoGasto = 'cheques';
	
  this.subscribe('gastos', () => {
    return [{tipoGasto: this.getReactively('tipoGasto')}];
  });
  
  this.helpers({
		gastos : () => {
			return Gastos.find();
		}
  });

  this.cambiar = function(tipoGasto){
    console.log(tipoGasto);
    this.tipoGasto = tipoGasto;
  }

  this.save = function(gasto){
    gasto.tipoGasto = this.tipoGasto;
    Gastos.insert(gasto);
  }
};