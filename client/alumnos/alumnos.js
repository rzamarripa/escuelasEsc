angular
  .module('casserole')
  .controller('AlumnosCtrl', AlumnosCtrl);
 
function AlumnosCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);
	$(document).ready(function() {
	  $(".select2").select2();
	});

  rc.action = true;
  rc.alumno = {};
  rc.buscar = {};
  rc.buscar.nombre = 'rob';

	rc.subscribe('alumnos', () => {
    return [{
	    options : { limit: 10 },
	    where : { nombre : this.getReactively('buscar.nombre') }
    }] ;
  });
  
  rc.subscribe('ocupaciones');
  
	rc.helpers({
		alumnos : () => {
			return Alumnos.find();
		},
	  ocupaciones : () => {
		  return Ocupaciones.find();
	  }
  });
  
  rc.guardar = function (alumno) {
	  console.log(alumno);
		rc.alumno.estatus = true;
		rc.alumno.nombreCompleto = alumno.nombre + " " + alumno.apPaterno + " " + alumno.apMaterno;
		Alumnos.insert(rc.alumno, function(err, doc){
			Meteor.call('createUsuario', rc.alumno, 'alumno');
			toastr.success('Alumno guardado.');
			$state.go('root.alumnoDetalle',{'id':doc});			
			rc.nuevo = true;
		});
	};
	
  rc.nuevoAlumno = function () {
    rc.action = true;
    rc.alumno = {};    
  };
  	
	rc.cambiarEstatus = function (id) {
		var alumno = Alumnos.findOne({_id:id});
    rc.alumno.estatus = !alumno.estatus;
		rc.alumno.save();
	};
	
	rc.refreshOcupaciones = function(query){
		console.log(query);
	}
	
	rc.tomarFoto = function () {
		$meteor.getPicture().then(function(data){
			rc.alumno.fotografia = data;
		})
	};
}