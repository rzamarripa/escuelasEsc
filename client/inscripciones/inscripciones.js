angular.module("casserole").controller("InscripcionesCtrl", ['$scope', '$meteor', function ($scope, $meteor)
{
  $scope.inscripciones = [];
  $meteor.call("getInscripciones").then(function (data) {
    $scope.inscripciones = data;
  });
}]);