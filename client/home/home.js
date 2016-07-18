angular
  .module('casserole')
  .controller('HomeCtrl', HomeCtrl);
 
function HomeCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {
	let rc = $reactive(this).attach($scope);

  this.subscribe("secciones",()=>{
		return [{estatus:true, _id : Meteor.user() != undefined ? Meteor.user().profile.seccion_id : "" }]
	 });
  this.subscribe("campus",()=>{
		return [{estatus:true, _id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	 });
  
  this.helpers({
	  seccion : () => {
		  return Secciones.findOne();
	  },
	   campus : () => {		   
		  return Campus.findOne();
	  }
  });		
}