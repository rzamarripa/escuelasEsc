angular.module("casserole").controller("CivilesCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
  $scope.civiles = $meteor.collection(Civiles).subscribe("civiles");
  $scope.action = true;  
  $scope.nuevo = true;


  $scope.nuevoCivil = function()
  {
   $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.civil = {}; 
    
  };
  
 $scope.guardar = function(civil)
	{
	    $scope.civil.estatus = true;
		$scope.civiles.save(civil);
		toastr.success('Estado guardado.');
        $scope.civil = ""; 
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
	
	$scope.editar = function(id)
	{
    $scope.civil = $meteor.object(Civiles, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(civil)
	{
		$scope.civil.save();
        $('.collapse').collapse('hide');
        $scope.nuevo = true;
	};
		
    $scope.cambiarEstatus = function(id)
	{
		var civil = $meteor.object(Civiles, id, false);
		if(civil.estatus == true)
			civil.estatus = false;
		else
			civil.estatus = true;
		
		civil.save();
	};
}]);
	