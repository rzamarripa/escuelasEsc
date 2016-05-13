angular
  .module('casserole')
  .controller('HorariosCtrl', HorariosCtrl);
 
function HorariosCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
	
	this.subscribe("horarios");

	this.helpers({
		horarios : () => {
			return Horarios.find();
		}
		
		
	});
	
};