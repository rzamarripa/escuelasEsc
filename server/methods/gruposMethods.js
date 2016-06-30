Meteor.methods({
  getGrupos: function (query, usuario) {
    query = query || {};
    var mmgs = MaestrosMateriasGrupos.find({maestro_id:Meteor.user().profile.maestro_id}).fetch()

    mmgs.forEach(function (mmg) {
      mmg.alumnos = [];
			mmg.maestro = Maestros.findOne(mmg.maestro_id);
      mmg.materia = Materias.findOne(mmg.materia_id);
      mmg.grupo = Grupos.findOne(mmg.grupo_id);
      var inscripciones = Inscripciones.find({grupo_id:mmg.grupo_id}).fetch();
      inscripciones.forEach(function(inscripcion){
        var alumno = Alumnos.findOne({_id:inscripcion.alumno_id});
        mmg.alumnos.push(alumno);
      });
    });
		
    return mmgs;

    function findInCollection(lista, valor) {
      return _.find(lista, function (x) {
        return x._id == valor;
      });
    }
  }
});