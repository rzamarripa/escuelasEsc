angular
  .module('casserole')
  .controller('AlumnosCtrl', AlumnosCtrl);
 
function AlumnosCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);

  this.action = true;
  this.alumno = {};
  this.buscar = {};
  this.buscar.nombre = '';
  this.alumno.nombreUsuario = '';

	this.subscribe('buscarAlumnos', () => {
    return [{
	    options : { limit: 10 },
	    where : { nombre : this.getReactively('buscar.nombre'), campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }
    }] ;
  });
  
  this.subscribe('buscarUsuario', () => {
    return [{
	    where : { nombreUsuario : this.getReactively('alumno.nombreUsuario')}
    }] ;
  });
  
  this.subscribe('ocupaciones',()=>{
		return [{estatus:true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	 });
  
	this.helpers({
		alumnos : () => {
			return Alumnos.find();
		},
	  ocupaciones : () => {
		  return Ocupaciones.find();
	  },
	  existeUsuario : ()  => {
		  var existe = Meteor.users.find().count();
		  return existe;
	  }
  });
  
  this.guardar = function (alumno,form) {
  
  		if(form.$invalid){
	        toastr.error('Error al guardar los datos del Alumno.');
	        return;
	    }
		this.alumno.estatus = true;
		var nombre = alumno.nombre != undefined ? alumno.nombre + " " : "";
		var apPaterno = alumno.apPaterno != undefined ? alumno.apPaterno + " " : "";
		var apMaterno = alumno.apMaterno != undefined ? alumno.apMaterno : "";
		this.alumno.nombreCompleto = nombre + apPaterno + apMaterno;
		this.alumno.fechaCreacion = new Date();
		this.alumno.campus_id = Meteor.user().profile.campus_id;
		Alumnos.insert(this.alumno, function(err, doc){
			Meteor.call('createUsuario', rc.alumno, 'alumno');
			toastr.success('Alumno guardado.');
			$state.go('root.alumnoDetalle',{'id':doc});			
			this.nuevo = true;
		});
		form.$setPristine();
        form.$setUntouched();
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
  var matriculaAnterior = 0;
  this.getMatricula = function(){
	  var cantidad = Alumnos.find({campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : ""}).count();
	  if(cantidad > 0){
		  var ultimoAlumno = Alumnos.findOne({}, {sort: {fechaCreacion:-1}});
		  if(ultimoAlumno){
			  matriculaAnterior = parseInt(ultimoAlumno.matricula) + 1;
			  matriculaAnterior = '' + matriculaAnterior;
			  	  
			  for(var i = 0; i <= ultimoAlumno.matricula.length; i++){
				  console.log("lenght 1", matriculaAnterior.length);
				  if(matriculaAnterior.length <= 7){
					  matriculaAnterior = "0" + matriculaAnterior;
				  }
			  }
			  console.log(matriculaAnterior);
			  rc.alumno.nombreUsuario = matriculaAnterior;
		  	rc.alumno.matricula = matriculaAnterior;
		  }
	  }else{
		  rc.alumno.nombreUsuario = "0000001";
		  rc.alumno.matricula = "0000001";
	  }
  }
}