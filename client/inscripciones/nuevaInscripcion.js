angular.module("casserole")
.controller('NuevaInscripcionCtrl', NuevaInscripcionCtrl); 
function NuevaInscripcionCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);

	this.subscribe('ciclos',()=>{
		return [{estatus:true}]
	});
	this.subscribe("secciones");
	this.subscribe("conceptosPago");
	this.subscribe("tiposingresos");
	this.subscribe('alumnoss',()=>{
		return [{estatus:true}]
	});
	this.subscribe("grupos",()=>{
		return [{estatus:true}]
	});
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
	  conceptosPago : () => {
		  return ConceptosPago.find();
	  }
  });


	this.inscripcion = {};
	this.inscripcion.totalPagar = 0.00;
	this.inscripcion.fechaInscripcion = new Date();
	this.inscripcion.conceptosSeleccionados = [];
	this.alumnoSeleccionado = {};
	this.cupo = false;
	this.inscripcion.abono = 0.00;
	
	this.guardar = function(inscripcion)
	{   
		this.inscripcion.estatus = true;
		console.log(inscripcion);
		_.each(inscripcion.conceptosSeleccionados, function(concepto){
			delete concepto.$$hashKey;
		})
		Inscripciones.insert(inscripcion);
		var grupo = Grupos.findOne(inscripcion.grupo_id);
		console.log(grupo);
		grupo.inscritos = parseInt(grupo.inscritos) + 1;
		//delete grupo._id;
		Grupos.update({_id: inscripcion.grupo_id},{$set:{grupo}});
		toastr.success('inscripcion guardada.');
		$state.go("root.inscripciones");
	};
	
	//Conceptos de cobro
  
  this.seleccionarConcepto = function(concepto) {
	  console.log(concepto);
	  
	  var idx = this.inscripcion.conceptosSeleccionados.indexOf(concepto);
  
    if (idx > -1) {
	    this.inscripcion.totalPagar -= parseFloat(concepto.importe);
      this.inscripcion.conceptosSeleccionados.splice(idx, 1);
    }
    else {
	    this.inscripcion.totalPagar += parseFloat(concepto.importe);
      this.inscripcion.conceptosSeleccionados.push(concepto);
    }
	  
    
    console.log(this.inscripcion.conceptosSeleccionados);
  };

	this.cuantoPaga = function(importe){
		console.log(importe);
		console.log(this.inscripcion.totalPagar);
		this.inscripcion.cambio = parseFloat(importe) - parseFloat(this.inscripcion.totalPagar);
	}
	
  this.getAlumnoSeleccionado= function(id)
	{
		console.log(id);
		var alumno = Alumnos.findOne(id);
		console.log(alumno);
		if(alumno){
			this.alumnoSeleccionado = alumno;
			this.alumnoSeleccionado.activo = true;
		}
	};	
	
	this.getCiclo= function(ciclo_id)
	{
		var ciclo = Ciclos.findOne(ciclo_id);
		if(ciclo)
		return ciclo.descripcion;
	};	
	
	this.hayCupo = function(grupo_id){
		console.log(grupo_id);
		var grupo = Grupos.findOne(grupo_id);
		console.log(grupo);
		if(grupo.inscritos < grupo.cupo){
			this.cupo = "check";
		}else{
			this.cupo = "remove";
		}
	}
	
	this.getGrupos = function(seccion_id, alumno_id){
		console.log(seccion_id, alumno_id);
		var inscrito = Inscripciones.findOne({seccion_id : seccion_id, alumno_id : alumno_id});
		if(!inscrito){
			toastr.success('Todo bien');
			rc.grupos = Grupos.find({seccion_id : seccion_id, estatus : true}).fetch();
		}else{
			toastr.error('Este grupo ya está inscrito en esta Sección');
		}
	}	
};