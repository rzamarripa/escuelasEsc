angular
  .module('casserole')
  .controller('AlumnosCtrl', AlumnosCtrl);
 
function AlumnosCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);

  this.action = true;
  this.alumno = {};
  this.buscar = {};
  this.buscar.nombre = '';

	this.subscribe('alumnos', () => {
    return [{
	    options : { limit: 10 },
	    where : { nombre : this.getReactively('buscar.nombre'), estatus : false }
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
		var nombre = alumno.nombre != undefined ? alumno.nombre + " " : "";
		var apPaterno = alumno.apPaterno != undefined ? alumno.apPaterno + " " : "";
		var apMaterno = alumno.apMaterno != undefined ? alumno.apMaterno : ""
		this.alumno.nombreCompleto = nombre + apPaterno + apMaterno;
		Alumnos.insert(this.alumno, function(err, doc){
			Meteor.call('createUsuario', rc.alumno, 'alumno');
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
	
	this.tieneFoto = function(sexo, foto){
	  if(foto === undefined){
		  if(sexo === "masculino")
			  return "img/badmenprofile.jpeg";
			else if(sexo === "femenino"){
				return "img/badgirlprofile.jpeg";
			}else{
				return "img/badprofile.jpeg";
			}
			  
	  }else{
		  return foto;
	  }
  }
}