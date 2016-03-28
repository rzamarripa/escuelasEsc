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
    }];
  });
	
	rc.helpers({
		alumno : () => {
			return Alumnos.findOne();
		},
	  ocupaciones : () => {
		  return Ocupaciones.find();
	  }
  });
  
	rc.actualizar = function(alumno)
	{
		alumno.nombreCompleto = alumno.nombre + " " + alumno.apPaterno + " " + alumno.apMaterno;
		delete alumno._id;		
		Alumnos.update({_id:$stateParams.id}, {$set : alumno});
		toastr.success('Alumno guardado.');
		$state.go("root.alumnoDetalle",{"id":$stateParams.id});
	};
	
	rc.tomarFoto = function () {
		$meteor.getPicture().then(function(data){
			rc.alumno.fotografia = data;
		});
	};
	
	rc.getOcupacion = function(id){
		var ocupacion = Ocupaciones.findOne(rc.alumno.ocupacion_id);
		return ocupacion.descripcion;
	};
}