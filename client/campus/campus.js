angular.module("casserole").controller("CampusCtrl", ['$scope', '$meteor', '$state','$stateParams', 'toastr',function($scope, $meteor, $state, $stateParams, toastr)
{
  $scope.campuss = $meteor.collection(Campus).subscribe("campus");
  $scope.action = true;  
   
   $scope.nuevo = true;
  $scope.nuevoCampus = function()
  {
     $scope.action = true;
    $scope.nuevo = !$scope.nuevo;
    $scope.campus = {};
  };
  
  $scope.guardar = function(campus)
	{
		$scope.campus.estatus = true;
		$scope.campuss.save(campus);
		toastr.success('Campus guardado.');
		$scope.campus = "";
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
	
	$scope.editar = function(id)
	{
    $scope.campus = $meteor.object(Campus, id, false);
    $scope.action = false;
    $('.collapse').collapse('show');
    $scope.nuevo = false;
	};
	
	$scope.actualizar = function(campus)
	{
		$scope.campus.save();
		$('.collapse').collapse('hide');
		$scope.nuevo = true;
	};
		
	$scope.cambiarEstatus = function(id)
	{
		var campus = $meteor.object(Campus, id, false);
		if(campus.estatus == true)
			campus.estatus = false;
		else
			campus.estatus = true;
		
		campus.save();
	};
}]);