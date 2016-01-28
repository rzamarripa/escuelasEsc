angular.module("casserole").controller("NuevoGrupoCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
	//$scope.grupo = $meteor.object(Grupos, $stateParams.id).subscribe("grupos");
	$scope.grupos = $meteor.collection(function() {return Grupos.find();}).subscribe("grupos");
	$scope.secciones = $meteor.collection(function(){return Secciones.find();}).subscribe("secciones");
	$scope.ciclos = $meteor.collection(function(){return Ciclos.find();}).subscribe("ciclos");
	$scope.turnos = $meteor.collection(function(){return Turnos.find();}).subscribe("turnos");
	$scope.maestros = $meteor.collection(function(){return Maestros.find();}).subscribe("maestros");
  $scope.action = true; 
  $scope.grupo = {};

	$scope.guardar = function(grupo)
	{
		grupo.estatus = true;
		grupo.inscritos = 0;
		$scope.grupos.save(grupo)
		toastr.success('Grupo guardado.');
		$state.go("root.grupos");
	};
	
	$scope.editarGrupo = function(id)
	{
    $scope.grupo = $meteor.object(Grupos, id, false);
    $scope.grupo = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.getGrados = function(seccion_id){
		var seccionSeleccionada = $meteor.object(Secciones, seccion_id, false);
		$scope.grados = [];
		for(var i = 1; i <= seccionSeleccionada.grados; i++ ){
			$scope.grados.push(i);
		}
		console.log($scope.grados);
	}

}]);