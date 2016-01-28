Meteor.methods({
  getGrupos: function (query) {
    query = query || {};
    var maestro = Maestros.findOne({nombreUsuario:Meteor.user().username});
    var grupos = Grupos.find({maestro_id:maestro._id}).fetch();
    
    var secciones = Secciones.find().fetch();
    var ciclos	 	= Ciclos.find().fetch();

    grupos.forEach(function (grupo) {
			grupo.alumnos = [];
      grupo.seccion = findInCollection(secciones, grupo.seccion_id);
      grupo.ciclos = findInCollection(ciclos, grupo.ciclo_id);
      grupo.maestro = maestro;
      grupo.usuario = Meteor.user();
      var inscripciones = Inscripciones.find({grupo_id:grupo._id}).fetch();
      inscripciones.forEach(function(inscripcion){
	      var alumno = Alumnos.findOne({_id:inscripcion.alumno_id});
	      grupo.alumnos.push(alumno);
      });
    });
		
    return grupos;

    function findInCollection(lista, valor) {
      return _.find(lista, function (x) {
        return x._id == valor;
      });
    }
  }
});