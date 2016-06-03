angular
.module("casserole")
.controller("MaestroGruposCtrl", MaestroGruposCtrl);
 function MaestroGruposCtrl($scope, $meteor, $reactive , $state, $stateParams){

	 	
	let rc = $reactive(this).attach($scope);

	
 this.subscribe('grupo', () => {
		
		return [{
			_id : $stateParams.id, estatus : true
		}]
	});

 this.helpers({		
		grupo : () => {
			return Grupos.findOne($stateParams.id);
		},
	
  });


	


	this.grupos = [];
	this.hoy = new Date();
	$meteor.call("getGrupos").then(function (data) {
		console.log(data);
    rc.grupos = data;
  });
};