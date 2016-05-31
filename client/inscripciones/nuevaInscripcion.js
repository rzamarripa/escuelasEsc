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
		Inscripciones.insert(angular.copy(inscripcion));
		var grupo = Grupos.find(inscripcion.grupo_id);
		console.log(grupo);
		grupo.inscritos += 1;
		Grupos.update({_id: grupo._id},{$set:{grupo}});
		toastr.success('inscripcion guardada.');
		console.log(grupo);
		$state.go("root.inscripciones");
		console.log(inscripcion);
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
		
		/*
		var conceptosOrdenados = _.sortBy(this.conceptosPago, function(o) { return o.orden; })
		var suma = 0.00;
		var abono = 0.00;		
		var conceptosSelec = [];
		this.inscripcion.conceptosSeleccionados = conceptosSelec;
		_.each(conceptosOrdenados, function(concepto){
			suma += parseFloat(concepto.importe);
			if(parseFloat(importe) >= suma){
				conceptosSelec.push(concepto);
				abono = parseFloat(importe) - parseFloat(concepto.importe);
				rc.inscripcion.abono = parseFloat(abono);
				console.log(abono);
				concepto.checked = true;
			}else{
				concepto.checked = false;
			}
		});
		*/
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
	
	this.getGrupos = function(seccion_id){
		this.grupos = Grupos.find({seccion_id : seccion_id, estatus:true}).fetch();
	}
	
};