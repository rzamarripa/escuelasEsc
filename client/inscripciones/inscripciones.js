angular.module("casserole")
.controller("InscripcionesCtrl",InscripcionesCtrl)
function InscripcionesCtrl($scope, $meteor, $reactive, $state, toastr) {
  let rc = $reactive(this).attach($scope);


	this.subscribe('ciclos',()=>{
		return [{estatus:true}]
	});
	this.subscribe("secciones",() => {
		return [{
		
		}]
	});
	this.subscribe("tiposingresos",() => {
		return [{
		
		}]
	});
	this.subscribe('alumnos',()=>{
		return [{estatus:true}]
	});
	this.subscribe("grupos", () => {
		return [{
		 estatus:true,
		}]
	});
	this.subscribe("planesEstudios",() => {
		return [{
		
		}]
	});
	this.subscribe('inscripciones',() => {
		return [{
		 
		}]
	});



	rc.helpers({
		ciclos : () => {
			return Ciclos.find();
		},
	  secciones : () => {
		  return Secciones.find();
	  },
	  tiposIngresos : () => {
		  return TiposIngresos.find();
	  },
	  alumnos : () => {
		  return Alumnos.find();
	  },
	  grupos : () => {
		  return Grupos.find();
	  },
	  planesEstudios : () => {
		  return PlanesEstudios.find();
	  },
	  inscripciones : () => {
	  	function findInCollection(lista, valor) {
	      return _.find(lista, function (x) {
	        return x._id == valor;
	      });
	    }
	  	var a=Inscripciones.find();
	  	var _inscripciones = Inscripciones.find().fetch();
	  	var alumnos 	= Alumnos.find().fetch();
	    var grupos 		= Grupos.find().fetch();
	    var secciones = Secciones.find().fetch();
	    var ciclos	 	= Ciclos.find().fetch();
	    var planesEstudios = PlanesEstudios.find().fetch();
	    _inscripciones.forEach(function (inscripcion) {
	      inscripcion.alumno = findInCollection(alumnos, inscripcion.alumno_id);
	      inscripcion.grupo = findInCollection(grupos, inscripcion.grupo_id);
	      inscripcion.seccion = findInCollection(secciones, inscripcion.seccion_id);
	      inscripcion.ciclo = findInCollection(ciclos, inscripcion.ciclo_id);
	      inscripcion.planEstudio = findInCollection(planesEstudios, inscripcion.planEstudio_id);
	    });
	    console.log(_inscripciones);
	    
	    return _inscripciones;
		 // return Inscripciones.find();
	  },
  });

	/*this.inscripciones = [];
	$meteor.call("getInscripciones").then(function (data) {
		console.log(data);
	  	rc.inscripciones = data;
	  });*/

	this.getCiclo= function(ciclo_id)
	{
		var ciclo = Ciclos.findOne(ciclo_id);
		if(ciclo != undefined)
		return ciclo.descripcion;
	};	

	this.getAlumno= function(alumno_id)
	{
		var alumno = Alumnos.findOne(alumno_id);
		if(alumno)
		return alumno.nombre;
	};


	this.getSeccion= function(seccion_id)
	{
		var seccion = Secciones.findOne(seccion_id);
		if(seccion != undefined)
		return seccion.descripcion;
	};	

	this.getGrupo= function(grupo_id)
	{
		var grupo = Grupos.findOne(grupo_id);
		console.log(grupo_id);
		console.log(grupo);
		if(grupo)
			return grupo.identificador;
	};	

	this.getPlan= function(plan_id)
	{
		var plan = PlanesEstudios.findOne(plan_id);
		if(plan != undefined)
		return plan.clave;
	};	
	
  
};