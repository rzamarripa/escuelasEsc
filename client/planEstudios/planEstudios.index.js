angular.module("casserole").controller("PlanEstudiosIndexCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
	//
	$scope.planesEstudios = $meteor.collection(function() {return PlanesEstudios.find();}).subscribe("planesEstudios");
	$scope.secciones = $meteor.collection(function(){return Secciones.find();}).subscribe("secciones");
	$scope.materias = $meteor.collection(function(){return Materias.find();}).subscribe("materias");
	

	$scope.action = $stateParams.id? false:true; 
	$scope.getSeccionById = function(id){ return Secciones.getSeccionById(id)};
	$scope.plan= $stateParams.id? $meteor.object(PlanesEstudios, $stateParams.id, false):{};
	
	function crearGrados(gradosActuales){
		if(gradosActuales <1 ){
			$scope.plan.grados=[];
			return;
		}
		if(!$scope.plan.grados){
			$scope.plan.grados=[];
			for (var i = 0; i < gradosActuales; i++) {
				grados[i]=[];
			};
		}
		while(gradosActuales<$scope.plan.grados.length)$scope.plan.grados.pop();
		while(gradosActuales>$scope.plan.grados.length)$scope.plan.grados.push([]);


	}
	$scope.getGrados = function() {
		var gradosActuales=$scope.plan? ($scope.plan.grado? $scope.plan.grado:0 ):0;
		
		crearGrados(gradosActuales)

		return _.range(gradosActuales);   
	};

	$scope.agregarMateria = function(nuevaMateria){
		var gradosActuales=$scope.plan? ($scope.plan.grado? $scope.plan.grado:0 ):0;
		crearGrados(gradosActuales)
		
		$scope.plan.grados[nuevaMateria.grado].push(nuevaMateria);
		$scope.nuevaMateria="";
		
	};

	$scope.quitarMateria = function(_materia){
		var i=$scope.plan.grados[_materia.grado].indexOf(_materia);
		$scope.plan.grados[_materia.grado].splice( i, 1 );
	}

	$scope.guardar = function()
	{
		$scope.plan.estatus = true;
		$scope.planesEstudios.save($scope.plan).then(function(docto){	
		toast.success('Plan de estudio guardado');	
			$state.go("root.planEstudio");
		});
		
	};
	$scope.actualizar = function()
	{

		$scope.plan.estatus = true;
		$scope.plan.save().then(function(docto){			
			$state.go("root.planEstudio");
		});
	};
	/*$scope.action = true;  

  
  	$scope.guardar = function(asd)
	{
		$scope.plan.estatus = true;
		$scope.planesEstudios.save($scope.plan).then(function(docto){			
			$state.go("root.planEstudioDetalle",{"id":docto[0]._id});
		});
	};
	
	$scope.nuevoAlumno = function()
	{
		$scope.action = true;
	    $scope.alumno = "";
	    
	};*/
}]);