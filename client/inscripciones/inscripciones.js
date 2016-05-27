angular.module("casserole")
.controller("InscripcionesCtrl",InscripcionesCtrl)
function InscripcionesCtrl($scope, $meteor, $reactive, $state, toastr) {
  let rc = $reactive(this).attach($scope);

/*
	this.subscribe('ciclos',()=>{
		return [{estatus:true}]
	});
	this.subscribe("secciones");
	this.subscribe("tiposingresos");
	this.subscribe('alumnoss',()=>{
		return [{estatus:true}]
	});
	this.subscribe("grupos", () => {
		return [{
		 estatus:true,
		}]
	});
	this.subscribe("planesEstudios");
	this.subscribe('inscripciones');



	this.helpers({
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
		  return Inscripciones.find();
	  },
  });
*/
	this.inscripciones = [];
	$meteor.call("getInscripciones").then(function (data) {
		console.log(data);
  	rc.inscripciones = data;
  });

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