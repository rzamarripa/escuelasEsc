angular
.module("casserole")
.controller("MaestroGruposCtrl", MaestroGruposCtrl);
 function MaestroGruposCtrl($scope, $meteor, $reactive , $state, $stateParams){
 	let rc = $reactive(this).attach($scope);
	//this.grupos = [];
	this.hoy = new Date();
	this.mmgs = [];
	/*
	this.grupos_id = [];
	this.subscribe('grupos', () => {		
		return [{
			_id : {$in:this.getReactively('grupos_id')}, estatus : true
		}]
	});

	this.subscribe('maestrosMateriasGrupos', () => {		
		return [{
			maestro_id: Meteor.user().profile.maestro_id
		}]
	});

 this.helpers({		
		grupo : () => {
			return Grupos.findOne($stateParams.id);
		},
		mmg : ()=>{
			var mmg = MaestrosMateriasGrupos.find().fetch();
			if(mmg != undefined){
				this.grupos_id = _.pluck(mmg, 'grupo_id')
				_.each(mmg, function(){

				})
			}

		}
  });
 	*/

	$meteor.call("getGrupos").then(function (data) {
    rc.mmgs = data;
  });

};