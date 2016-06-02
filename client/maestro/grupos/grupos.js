angular
.module("casserole")
.controller("MaestroGruposCtrl", MaestroGruposCtrl);
 function MaestroGruposCtrl($scope, $meteor, $reactive , $state, $stateParams){

	 	
	let rc = $reactive(this).attach($scope);
	
	this.grupos = [];
	this.hoy = new Date();
	$meteor.call("getGrupos").then(function (data) {
		console.log(data);
    rc.grupos = data;
  });
};