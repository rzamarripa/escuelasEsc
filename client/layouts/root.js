angular.module("casserole")
.controller("RootCtrl", RootCtrl);  
 function RootCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	let rc = $reactive(this).attach($scope); 
 	this.usuarioActual = {};
 	
 	this.autorun(function() {
	 	
    if(Meteor.user() && Meteor.user()._id){
      rc.usuarioActual=Meteor.user();      
    }
    
  });
};