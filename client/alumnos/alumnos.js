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
	this.validation = false;
	this.subscribe('buscarAlumnos', () => {
    return [{
	    options : { limit: 10 },
	    where : { nombre : this.getReactively('buscar.nombre'), 
		    seccion_id : Meteor.user() != undefined ? Meteor.user().profile.seccion_id : "" }
    }] ;
  });
  
  this.subscribe('buscarUsuario', () => {
    return [{
	    where : { nombreUsuario : this.getReactively('alumno.nombreUsuario')}
    }] ;
  });
  
  this.subscribe('ocupaciones',()=>{
		return [{estatus:true}]
	 });
	
	this.subscribe('campus',()=>{
		return [{_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	 });
  
	this.helpers({
		alumnos : () => {
			return Alumnos.find();
		},
	  ocupaciones : () => {
		  return Ocupaciones.find();
	  },
	  cantidad : () => {
		  return Alumnos.find({seccion_id : Meteor.user() != undefined ? Meteor.user().profile.seccion_id : ""}).count();
	  },
	  matricula : () => {
		  if(Meteor.user()){
			  var matriculaAnterior = 0;
			  anio = '' + new Date().getFullYear();
			  anio = anio.substring(2,4);
			  if(this.getReactively("cantidad") > 0){
				  var ultimoAlumno = Alumnos.findOne({}, {sort: {fechaCreacion:-1}});
				  if(ultimoAlumno){
					  identificador = ultimoAlumno.matricula.substring(1, ultimoAlumno.matricula.length);
					  console.log(identificador);
					  matriculaAnterior = parseInt(identificador) + 1;
					  matriculaAnterior = 'e' + matriculaAnterior;
					  rc.alumno.nombreUsuario = matriculaAnterior;
				  	rc.alumno.matricula = matriculaAnterior;
				  }
			  }else{
				  rc.alumno.nombreUsuario = "e" + anio + Meteor.user().profile.campus_clave + "001";
				  rc.alumno.matricula = "e" + anio + Meteor.user().profile.campus_clave + "001";
			  }
		  }
	  }
  });
  
  this.guardar = function (alumno,form) {
		if(form.$invalid){
			this.validation = true;
			console.log(form.$invalid);
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
		this.alumno.seccion_id = Meteor.user().profile.seccion_id;
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
		$meteor.getPicture({width:200, height: 200, quality: 50}).then(function(data){			
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