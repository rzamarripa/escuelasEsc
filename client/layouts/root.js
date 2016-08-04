angular.module("casserole")
.controller("RootCtrl", RootCtrl);  
 function RootCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	let rc = $reactive(this).attach($scope); 
 	this.usuarioActual = {};
 	this.avisos = "none";
 	
 	if(Meteor.user() && Meteor.user().roles && Meteor.user().roles[0] != "admin"){

		 	this.subscribe('campus', function(){
				return [{
					_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : ""
				}]
			});
			
			this.subscribe('secciones', function(){
				return [{
					_id : Meteor.user() != undefined ? Meteor.user().profile.seccion_id : ""
				}]
			});
		 	
		 	this.autorun(function() {
			 	
		    if(Meteor.user() && Meteor.user()._id){
		      rc.usuarioActual=Meteor.user();
		    }
		    
		  });
		  
		  this.helpers({
			  campus : () => {
				  return Campus.findOne(Meteor.user().profile.campus_id);
			  },
			  seccion : () => {
				  return Secciones.findOne(Meteor.user().profile.seccion_id);
			  }
		  });
 	}
 	
 	if(Meteor.user() && Meteor.user().roles && Meteor.user().roles[0] == "director"){
 			this.subscribe('avisos',()=>{
				return [{}]
			});
			
			this.helpers({
				avisos : () => {
				  return Avisos.find();
			  }
		  });		
 	}
 	
 	 this.muestraAvisos = function(){
	  if(rc.avisos == "none"){
		  rc.avisos = "block";
	  }else{
		  rc.avisos = "none";
	  }
  }
};