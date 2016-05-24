angular.module("casserole")
.controller('NuevaInscripcionCtrl', NuevaInscripcionCtrl); 
function NuevaInscripcionCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);

	this.subscribe('ciclos',()=>{
		return [{estatus:true}]
	});
	this.subscribe("secciones");
	this.subscribe("tiposingresos");
	this.subscribe('alumnoss',()=>{
		return [{estatus:true}]
	});
	this.subscribe("grupos");
	this.subscribe("planesEstudios");
	this.subscribe('inscripciones',()=>{
		return [{estatus:true}]
	});



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


	this.inscripcion = {};
	this.inscripcion.fechaInscripcion = new Date();
	this.alumnoSeleccionado = {};
	this.cupo = false;
	
	this.guardar = function(inscripcion)
	{   
		this.inscripcion.estatus = true;
		Inscripciones.insert(angular.copy(inscripcion));
		var grupo = $meteor.object(Grupos, inscripcion.grupo_id,false).subscribe("grupos");
		console.log(grupo);
		grupo.inscritos += 1;
		grupo.save();
		toastr.success('inscripcion guardada.');
		console.log(grupo);
		$state.go("root.inscripciones");
		console.log(inscripcion);
	};
	
	/*this.getAlumnoSeleccionado = function(alumno)
	{		
		this.alumnoSeleccionado = $meteor.object(Alumnos, alumno, false);
		this.alumnoSeleccionado.activo = true;
	}*/

    this.getAlumnoSeleccionado= function(alumno)
	{
		var alumno = Alumnos.findOne(alumno_id);
		this.alumnoSeleccionado.activo;
		if(alumno)
		return alumno.nombre;
	};	
	this.getCiclo= function(ciclo_id)
	{
		var ciclo = Ciclos.findOne(ciclo_id);
		if(ciclo)
		return ciclo.descripcion;
	};	


	
	this.hayCupo = function(grupo_id){
		var grupo = Grupos.findOne({_id:grupo_id});
		var total = Inscripciones.find({grupo_id : grupo_id}).count();
		if(total < grupo.cupo){
			this.cupo = "check";
		}else{
			this.cupo = "remove";
		}
	}
	
};