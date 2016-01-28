angular.module("casserole").controller("NuevaInscripcionCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',
function($scope, $meteor, $state, $stateParams, toastr)
{
	$scope.ciclos = $meteor.collection(function() {return Ciclos.find();}).subscribe("ciclos");
	$scope.secciones = $meteor.collection(function() {return Secciones.find();}).subscribe("secciones");
	$scope.tiposIngresos = $meteor.collection(function() {return TiposIngresos.find();}).subscribe("tiposingresos");
	$scope.alumnos = $meteor.collection(function() {return Alumnos.find();}).subscribe("alumnos");
	$scope.grupos = $meteor.collection(function() {return Grupos.find();}).subscribe("grupos");
	$scope.planesEstudio = $meteor.collection(function() {return PlanesEstudios.find();}).subscribe("planesEstudios");
	$scope.inscripciones = $meteor.collection(function() {return Inscripciones.find();}).subscribe("inscripciones");
	$scope.inscripcion = {};
	$scope.inscripcion.fechaInscripcion = new Date();
	$scope.alumnoSeleccionado = {};
	$scope.cupo = false;
	
	$scope.guardar = function(inscripcion)
	{
		$scope.inscripcion.estatus = true;
		Inscripciones.insert(angular.copy(inscripcion));
		var grupo = $meteor.object(Grupos, inscripcion.grupo_id,false).subscribe("grupos");
		console.log(grupo);
		grupo.inscritos += 1;
		grupo.save();
		toastr.success('inscripcion guardada.');
		console.log(grupo);
		$state.go("root.inscripciones");
	};
	
	$scope.getAlumnoSeleccionado = function(alumno){		
		$scope.alumnoSeleccionado = $meteor.object(Alumnos, alumno, false);
		$scope.alumnoSeleccionado.activo = true;
	}
	
	$scope.hayCupo = function(grupo_id){
		var grupo = Grupos.findOne({_id:grupo_id});
		var total = Inscripciones.find({grupo_id : grupo_id}).count();
		if(total < grupo.cupo){
			$scope.cupo = "check";
		}else{
			$scope.cupo = "remove";
		}
	}
	
}]);