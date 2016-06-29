angular
.module("casserole")
.controller("MaestroGruposCtrl", MaestroGruposCtrl);
 function MaestroGruposCtrl($scope, $meteor, $reactive , $state, $stateParams){
 	let rc = $reactive(this).attach($scope);
	this.grupos = [];
	this.hoy = new Date();
		
	this.subscribe('grupo', () => {		
		return [{
			_id : $stateParams.id, estatus : true
		}]
	});

  this.subscribe('asistencia', () => {		
		return [{
			_id : $stateParams.id, estatus : true
		}]
	});

 this.helpers({		
		grupo : () => {
			return Grupos.findOne($stateParams.id);
		},
		asistencia : () => {
			return Asistencias.findOne($stateParams.id);
		},	
  });

	$meteor.call("getGrupos").then(function (data) {
    rc.grupos = data;
  });
};