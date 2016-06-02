angular.module("casserole").controller
("MaestroAsistenciasCtrl",MaestroAsistenciasCtrl);
function MaestroAsistenciasCtrl($scope, $reactive, $meteor, $state, $stateParams, toastr) {
	let rc =$reactive(this).attach($scope);
	
	this.asistencia = {};
  $meteor.call("getAlumnosGrupo", {grupo_id:$stateParams.id}).then(function (data) {	
  	console.log(data)
    rc.asistencia.alumnos = data;
  });
  
  this.guardar = function(asistencia){
  	console.log(asistencia)
	  _.each(asistencia.alumnos, function(alumno){
		  delete alumno['$$hashKey'];
	  })
	  var asistenciaActual = {
		  alumnos : asistencia.alumnos,
		  fechaAsistencia : new Date(),
		  usuario : Meteor.user().username,
	  }

		$meteor.call("setAsistencia", asistenciaActual).then(function (data) {
			if(data == true){
				toastr.success("Gracias por tomar asistencia");
				$state.go("root.verAsistencias", {id:$stateParams.id});
			}else{
				toastr.success("Hubo un problema al tomar asistencia");
			}
	    
	  });
		
	}
	
	
  
};