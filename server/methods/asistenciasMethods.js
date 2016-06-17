Meteor.methods({
  getAlumnosGrupo: function (query) {
    query = query || {};
    var maestro = Maestros.findOne({nombreUsuario:Meteor.user().username});
    var inscripciones = Inscripciones.find(query).fetch();
    var alumnos = [];
    console.log(inscripciones)
    inscripciones.forEach(function(inscripcion){
      var alumno = Alumnos.findOne({_id:inscripcion.alumno_id});
      alumnos.push({_id:alumno._id, matricula:alumno.matricula, nombre:alumno.nombre, apPaterno:alumno.apPaterno, apMaterno:alumno.apMaterno, checked:true});
    });
    //console.log(alumnos)
    return alumnos;
  },
  setAsistencia: function (asistencia) {
	  var maestro = Maestros.findOne({nombreUsuario:Meteor.user().username});
     var grupo = Grupos.findOne();
	  asistencia.maestro_id = maestro._id; 
    asistencia.grupo_id = grupo._id; 
	  Asistencias.insert(asistencia);
	  return true;
  },
  getAsistencias: function(grupo_id){
	  return Asistencias.find({grupo_id:grupo_id},{sort:{fechaAsistencia:1}}).fetch();
      
  }
});