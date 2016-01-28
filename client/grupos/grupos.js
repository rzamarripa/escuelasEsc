angular.module("casserole").controller("GruposCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
	$scope.grupos = $meteor.collection(function() {return Grupos.find();}).subscribe("grupos");
	$scope.secciones = $meteor.collection(function(){return Secciones.find();}).subscribe("secciones");
	$scope.ciclos = $meteor.collection(function(){return Ciclos.find();}).subscribe("ciclos");
	$scope.turnos = $meteor.collection(function(){return Turnos.find();}).subscribe("turnos");
  $scope.action = true; 

  $scope.nuevoGrupo = function()
  {
    $scope.action = true;
    $scope.grupo = {};
  }; 

	$scope.actualizar = function(grupo)
	{
		$scope.grupo.save();
		toastr.success('grupo guardado.');
		$('.collapse').collapse('hide');
	};

	$scope.cambiarEstatus = function(id)
	{
		var grupo = $meteor.object(Grupos, id, false);
		if(grupo.estatus == true)
			grupo.estatus = false;
		else
			grupo.estatus = true;		
		grupo.save();
	};
	
	$scope.getSeccion = function(seccion_id)
	{
		var seccion = $meteor.object(Secciones, seccion_id, false);
		return [seccion.descripcion, seccion.grados];
	};

	$scope.getCiclo = function(ciclo_id)
	{
		ciclo = _.find($scope.ciclos,function(x){return x._id==ciclo_id;});
		return ciclo.anioEscolar + " " + ciclo.complementoEscolar;
	};	
	
	$scope.getTurno = function(turno_id)
	{
		var turno = $meteor.object(Turnos, turno_id, false);
		return turno.nombre;
	};	
	
	$scope.getEstatus = function(estatus){
		if (estatus == false)
			return "Activar";
		else
			return "Desactivar";
	}
}]);