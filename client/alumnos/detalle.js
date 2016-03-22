angular
  .module('casserole')
  .controller('AlumnosDetalleCtrl', AlumnosDetalleCtrl);
 
function AlumnosDetalleCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {

	let rc = $reactive(this).attach($scope);
	
	rc.alumno = {};
	rc.fechaActual = new Date();
	
	rc.subscribe("ocupaciones");
	
	rc.subscribe('alumno', () => {
    return [{
	    id : $stateParams.id
    }] ;
  });
	
	rc.helpers({
		alumno : () => {
			var alumnos = Alumnos.find();
			var uno = {};
			alumnos.forEach(function(al){
				uno = al;
			});
			return uno;
		},
	  ocupaciones : () => {
		  return Ocupaciones.find();
	  }
  });
  
	rc.actualizar = function(alumno)
	{
		rc.alumno.nombreCompleto = alumno.nombre + " " + alumno.apPaterno + " " + alumno.apMaterno;
		Alumnos.update({_id:$stateParams.id}, {$set : {alumno}});
		toastr.success('Alumno guardado.');
		$state.go("root.alumnoDetalle",{"id":alumno._id});
	};
	
	rc.tomarFoto = function () {
		$meteor.getPicture().then(function(data){
			rc.alumno.fotografia = data;
		});
	};
	
	rc.getOcupacion = function(id){
		var ocupacion = $meteor.object(Ocupaciones, id, false);
		return ocupacion.descripcion;
	};
}