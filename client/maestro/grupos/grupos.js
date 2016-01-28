angular.module("casserole").controller("MaestroGruposCtrl", ['$scope', '$meteor', '$state', '$stateParams', 'toastr', 
function($scope, $meteor, $state, $stateParams, toastr) {
	$scope.grupos = [];
	$scope.hoy = new Date();
	$meteor.call("getGrupos").then(function (data) {
    $scope.grupos = data;
  });
}]);
