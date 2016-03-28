angular
  .module('casserole')
  .controller('HorariosCtrl', HorariosCtrl);
 
function HorariosCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);
	
	rc.subscribe("horarios");

	rc.helpers({
		horarios : () => {
			return Horarios.find();
		}
		
		
	});
	
};