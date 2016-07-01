angular.module("casserole")
.controller('NuevaInscripcionCtrl', NuevaInscripcionCtrl); 
function NuevaInscripcionCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);

	this.subscribe('ciclos',()=>{
		return [{estatus:true}]
	});
	this.subscribe("secciones");
	//this.subscribe("conceptosPago");
	this.subscribe("tiposingresos");
	this.subscribe('alumnos',()=>{
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
	  }/*,
	  conceptosPago : () => {
		  return ConceptosPago.find();
	  }*/
  });


	this.inscripcion = {};
	this.inscripcion.totalPagar = 0.00;
	//this.inscripcion.fechaInscripcion = new Date();
	this.inscripcion.conceptosSeleccionados = [];
	this.alumnoSeleccionado = {};
	this.cupo = false;
	this.inscripcion.abono = 0.00;
	
	this.guardar = function(inscripcion)
	{   
		this.inscripcion.estatus = true;
		/*_.each(inscripcion.conceptosSeleccionados, function(concepto){
			delete concepto.$$hashKey;
		})*/
		console.log("hola")
		console.log(inscripcion);
		var grupo = Grupos.findOne(inscripcion.grupo_id);

		inscripcion.plan = grupo.plan;
		for (var i in inscripcion.plan) {
			var _periodo = inscripcion.plan[i];
			console.log(_periodo);
			if(_periodo.tipoPlan=='inscripcion' && _periodo.activa==true){
				_periodo.pago= parseFloat(inscripcion.importePagado);	
				if(inscripcion.totalPagar<=parseFloat(inscripcion.importePagado)
					&& _periodo.planPago && _periodo.planPago instanceof Array){
					_periodo.planPago[0].pagada =1;
				}
				break;
			}
		}

		//inscripcion.planPagoInscripcion.pago = parseFloat(inscripcion.importePagado);

		
		

		Inscripciones.insert(inscripcion);
		//var grupo = Grupos.findOne(inscripcion.grupo_id);
		console.log(grupo);
		grupo.inscritos = parseInt(grupo.inscritos) + 1;
		delete grupo._id;
		Grupos.update({_id: inscripcion.grupo_id},{$set:grupo});
		toastr.success('Alumno Inscrito');
		$state.go("root.inscripciones");
	};
	this.calcularImporteU= function(datos,pago){
		//console.log(datos,pago)
		//console.log(this.inscripcion);
		if(datos && datos.activa==false)
			return 0;
		var fechaActual = this.inscripcion.fechaInscripcion;
  		var fechaCobro = new Date(pago.fecha);
  		//console.log(fechaActual,fechaCobro);
  		var diasRecargo = Math.floor((fechaActual-fechaCobro) / (1000 * 60 * 60 * 24)); 
  		var diasDescuento = Math.floor((fechaCobro-fechaActual) / (1000 * 60 * 60 * 24)); 
  		var importe = datos.importe;
  		//console.log(diasRecargo,diasDescuento);
  		for (var i = 0; datos.procedimientos && i < datos.procedimientos.length; i++) {
  			console.log(importe);
  			if(datos.procedimientos[i].tipoProcedimiento == 'Recargo' && diasRecargo >=datos.procedimientos[i].dias){
  			//	console.log('Recargo');
  				importe+=datos.procedimientos[i].monto;
  			}
  			if(datos.procedimientos[i].tipoProcedimiento == 'Descuento' && diasDescuento >=datos.procedimientos[i].dias){
  			//	console.log('Descuento');
  				importe-=datos.procedimientos[i].monto;
  			}
  		};
  		return importe
	}	
	this.autorun(() => {
	  	var grupoid = this.getReactively("inscripcion.grupo_id");
	  	var grupo = undefined;
	  	if(grupoid)
			grupo = Grupos.findOne(grupoid);
		//console.log(grupo);
	  	if(grupo && grupo.plan ){
	  		this.inscripcion.totalPagar = 0;
	  		var _periodo = null;
	  		for(var ind in grupo.plan){
	  			if(grupo.plan[ind] && grupo.plan[ind].tipoPlan=='inscripcion'){
	  				_periodo = grupo.plan[ind];
	  				break;
	  			}
	  		}
	  		 
	  		//console.log(_periodo);
	  		for (var j = 0; j < _periodo.datos.length; j++) {
	  			this.inscripcion.totalPagar+=this.calcularImporteU(_periodo.datos[j],_periodo.planPago[0]);

	  		}
	  		/*if(_periodo.tipoPlan=='inscripcion'){
	  				for (var j = 0; j < _periodo.datos.length; j++) {
	  					this.inscripcion.totalPagar+=_periodo.datos[j].importe
	  				}
	  				break;
	  		}*/

	  	}
			
		
  	});
	
	//Conceptos de cobro
  
  /*this.seleccionarConcepto = function(concepto) {	  
	  var idx = this.inscripcion.conceptosSeleccionados.indexOf(concepto);
  
    if (idx > -1) {
	    this.inscripcion.totalPagar -= parseFloat(concepto.importe);
      this.inscripcion.conceptosSeleccionados.splice(idx, 1);
    }
    else {
	    this.inscripcion.totalPagar += parseFloat(concepto.importe);
      this.inscripcion.conceptosSeleccionados.push(concepto);
    }
  };*/

	this.cuantoPaga = function(importe){
		if(importe>this.inscripcion.totalPagar)
			this.inscripcion.cambio = parseFloat(importe) - parseFloat(this.inscripcion.totalPagar);
		else 
			this.inscripcion.cambio =0;
	}
	
  this.getAlumnoSeleccionado= function(id)
	{
		var alumno = Alumnos.findOne(id);
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
		var grupo = Grupos.findOne(grupo_id);
		if(grupo.inscritos < grupo.cupo){
			this.cupo = "check";
		}else{
			this.cupo = "remove";
		}
	}
	
	this.getGrupos = function(seccion_id, alumno_id){
		var inscrito = Inscripciones.findOne({seccion_id : seccion_id, alumno_id : alumno_id});
		if(!inscrito){
			toastr.success('El alumno puede inscribirse');
			rc.grupos = Grupos.find({seccion_id : seccion_id, estatus : true}).fetch();
		}else{
			toastr.error('Este alumno ya está inscrito en esta Sección');
		}
	}	
	
	this.dejoAbono = function(){
		if(this.inscripcion.quiereAbonar){
			rc.inscripcion.abono = rc.inscripcion.cambio;
			rc.inscripcion.cambio = 0.00;
		}else{
			rc.inscripcion.cambio = rc.inscripcion.abono;
			rc.inscripcion.abono = 0.00;
		}
	}
};