angular
  .module('casserole')
  .controller('AlumnosCtrl', AlumnosCtrl);
 
function AlumnosCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);
	$(document).ready(function() {
	  $(".select2").select2();
	});

  this.action = true;
  this.alumno = {};
  this.buscar = {};
  this.buscar.nombre = '';

	this.subscribe('alumnos', () => {
    return [{
	    options : { limit: 10 },
	    where : { nombre : this.getReactively('buscar.nombre') }
    }] ;
  });
  
  this.subscribe('ocupaciones');
  
	this.helpers({
		alumnos : () => {
			return Alumnos.find();
		},
	  ocupaciones : () => {
		  return Ocupaciones.find();
	  }
  });
  
  this.guardar = function (alumno) {
		this.alumno.estatus = true;
		this.alumno.nombreCompleto = alumno.nombre + " " + alumno.apPaterno + " " + alumno.apMaterno;
		Alumnos.insert(this.alumno, function(err, doc){
			Meteor.call('createUsuario', this.alumno, 'alumno');
			toastr.success('Alumno guardado.');
			$state.go('root.alumnoDetalle',{'id':doc});			
			this.nuevo = true;
		});
	};
  	
	this.cambiarEstatus = function (id) {
		var alumno = Alumnos.findOne({_id:id});
    this.alumno.estatus = !alumno.estatus;
		this.alumno.save();
	};
	
	this.tomarFoto = function () {
		$meteor.getPicture().then(function(data){			
			rc.alumno.fotografia = data;
		})
	};
	
	
}