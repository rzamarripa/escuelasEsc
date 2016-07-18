angular
  .module('casserole')
  .controller('HorariosCtrl', HorariosCtrl);
 
function HorariosCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
	
	this.subscribe("horarios",()=>{
		return [{estatus:true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	 });

	this.helpers({
		horarios : () => {
			return Horarios.find();
		}
		
		
	});
	
};