angular
  .module('casserole')
  .controller('AlumnosDetalleCtrl', AlumnosDetalleCtrl);
 
function AlumnosDetalleCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {
	
	rc = $reactive(this).attach($scope);
	
	var quitarhk=function(obj){
		if(Array.isArray(obj)){
			for (var i = 0; i < obj.length; i++) {
				obj[i] =quitarhk(obj[i]);
			}
		}
		else if(obj !== null && typeof obj === 'object')
		{
			delete obj.$$hashKey;
			for (var name in obj) {
	  			obj[name] = quitarhk(obj[name]);
			}

		}
		return obj;
	}

	this.totalPagar = 0.00;
	this.alumno = {};
	this.fechaActual = new Date();
	this.hayParaPagar = true;
	
	this.subscribe("ocupaciones");

	this.subscribe('inscripciones', () => {
	    return [{
		    alumno_id : $stateParams.id
	    }];
	  });
	this.subscribe('alumno', () => {
    return [{
	    id : $stateParams.id
    }];
  });

	this.subscribe("grupos",() => {
	    return [{}];
	  });
  
  this.subscribe('pagosAlumno', () => {
    return [{
	    alumno_id : $stateParams.id
    }];
  });
    
	this.helpers({
		alumno : () => {
			return Alumnos.findOne();
		},
	  ocupaciones : () => {
		  return Ocupaciones.find();
	  },
	  misPagos : () => {
		  return Pagos.find();
	  },
	  inscripciones : () =>{
	  	return Inscripciones.find();
	  }

	 /* misSemanas : () => {
		  var inscripcion = moment("2013-01-03");
		  var hoy = moment();
		  var cantSemanas = hoy.diff(inscripcion, 'week');
		  semanas = [];
		  for(var j=0; j<= cantSemanas; j++){
			  var elAnio = inscripcion.year();
			  semanas.push({semana: j, numero : moment(inscripcion).week(), pagada : 0, anio : elAnio });
				inscripcion.add(1, 'weeks');
		  }
		  
		  _.each(this.getReactively('misPagos'), function(pago){
				_.each(semanas, function(semana){
					if(semana.numero == pago.semana && semana.anio == pago.anio){
						semana.pagada = 1;
						semana.importe = pago.importe;
					}
				});
			});
			
		  return semanas;
	  }*/
  });

	 this.grupo = function (grupoId){
	  	//console.log(grupoId);
	  	var _grupo = Grupos.findOne(grupoId);
	  	//console.log(_grupo);
	  	return _grupo;
	  }

  
	this.actualizar = function(alumno)
	{
		alumno.nombreCompleto = alumno.nombre + " " + alumno.apPaterno + " " + alumno.apMaterno;
		delete alumno._id;		
		Alumnos.update({_id:$stateParams.id}, {$set : alumno});
		toastr.success('Alumno guardado.');
		$state.go("root.alumnoDetalle",{"id":$stateParams.id});
	};
	
	this.tomarFoto = function () {
		$meteor.getPicture().then(function(data){
			rc.alumno.fotografia = data;
		});
	};
	
	this.totalPagado = function(){
	  var temp = 0.00;
	  _.each(this.misPagos, function(pago){	
		  temp += parseFloat(pago.importe);		
	  });
	  return temp;
  }
  
  this.seleccionarSemana = function(cobro,plan){
	  //console.log(cobro);
	  //var semSel = cobro.anio + cobro.numero;	
	  rc.hayParaPagar = true;
	  rc.totalPagar=0;
	  for (var i = 0; i < cobro.no; i++) {
	  		if(plan.planPago[i].pagada!=1){
	  			rc.hayParaPagar = false;
	  			plan.planPago[i].pagada =2;
	  			rc.totalPagar+=plan.cuota;
	  			var fechaActual = new Date();
  				var fechaCobro = new Date(plan.planPago[i].fecha);
  				var dias = Math.floor((fechaActual-fechaCobro) / (1000 * 60 * 60 * 24)); 
  				var diasDescuento = Math.floor((fechaCobro-fechaActual) / (1000 * 60 * 60 * 24)); 
  				for (var j = 0; j < plan.recargos.length; j++) {
  					//console.log('aqui entre',dias,plan.recargos[j].dias);
	  				if(plan.recargos[j].dias<dias){
	  					if(plan.recargos[j].tipoRecargo=="Fijo"){
	  						rc.totalPagar+=plan.recargos[j].recargo;
	  					}
	  					else if (plan.recargos[j].tipoRecargo=="Procentual") {
	  						rc.totalPagar+=((plan.recargos[j].recargo/100)*plan.cuota);
	  					}
	  				}

	  			}
	  			for (var j = 0; j < plan.descuentos.length; j++) {
  					//console.log('aqui entre',dias,plan.recargos[j].dias);
  					//console.log(plan.descuentos[j].dias,diasDescuento);
	  				if(plan.descuentos[j].dias<diasDescuento){
	  					if(plan.descuentos[j].tipoDescuento=="Fijo"){
	  						rc.totalPagar-=plan.descuentos[j].descuento;
	  					}
	  					else if (plan.descuentos[j].tipoDescuento=="Procentual") {
	  						rc.totalPagar-=((plan.descuentos[j].descuento/100)*plan.cuota);
	  					}
	  				}

	  			}


	  		}

	  };
	  for (var i = cobro.no; i < plan.planPago.length; i++) {
	  	if(plan.planPago[i].pagada!=1){
	  		plan.planPago[i].pagada=0;
	  	}
	  }
	  
	  /*_.each(rc.misSemanas, function(semana){
		  var semAct = semana.anio + semana.numero;
		  if(semana.semana <= semanaSeleccionada.semana && semana.pagada == 0){
			  rc.totalPagar += 350.00;
			  semana.pagada = 2;
		  }else if(semana.semana >= semanaSeleccionada.semana && semana.pagada == 2){
			  rc.totalPagar -= 350.00;
			  semana.pagada = 0;
		  }else if(semanaSeleccionada.pagada == 1 && semana.semana == semanaSeleccionada.semana){
			  semana.pagada = 3;
		  }else if(semanaSeleccionada.pagada == 3 && semana.semana == semanaSeleccionada.semana){
			  semana.pagada = 1;
		  }
	  });
	  
	  _.each(rc.misSemanas, function(semana){
		  if(semana.pagada == 2){
			  rc.hayParaPagar = false;
			  return;
		  }
	  });*/
  }
  
  this.imprimir = function(semanaSeleccionada){
	  var semanasImprimir = [];
	  _.each(rc.misSemanas, function(semana){
			if(semana.pagada == 3){
				semanasImprimir.push(semana);
			}
		});
		//console.log(semanasImprimir);
		$state.go("anon.pagosImprimir",{semanas : semanasImprimir, id : $stateParams.id},{newTab : true});
		
  }

  
  	this.obtenerEstatus = function(cobro,recargos){
  		var fechaActual = new Date();
  		var fechaCobro = new Date(cobro.fecha);
  		var dias = Math.floor((fechaActual-fechaCobro) / (1000 * 60 * 60 * 24)); 
  		//console.log(recargos);
  		if(!recargos) recargos =[];
	  	if(cobro.pagada==1){
		  	return "bg-color-green txt-color-white";
	 	}
	 	else  if(cobro.pagada==2){
	 		return "bg-color-blue txt-color-white";
	 	}
	 	else {
	  		for (var i = 0; i < recargos.length; i++) {
	  			//console.log(dias,recargos[i].dias,cobro);
	  			if(recargos[i].dias<dias)
	  				return "bg-color-orange txt-color-white";
	  		};

		  return "";
		}
  	}
  
  this.pagar = function(){
		if (confirm("Está seguro de realizar el cobro por $" + parseFloat(rc.totalPagar))) {
			var semanasPagadas = [];
			for (var i = 0; i < rc.inscripciones.length; i++) {
				//console.log(rc.inscripciones[i].planPagoInscripcion.planPago);
				for (var j = 0; j < rc.inscripciones[i].planPagoInscripcion.planPago.length; j++) {
					if(rc.inscripciones[i].planPagoInscripcion.planPago[j].pagada==2){
						rc.inscripciones[i].planPagoInscripcion.planPago[j].pagada=1;
						rc.inscripciones[i].planPagoInscripcion.planPago[j].pago=rc.inscripciones[i].planPagoInscripcion.cuota;	
						var pago = rc.inscripciones[i].planPagoInscripcion.planPago[j];
						Pagos.insert({
							fechaPago 	: new Date(),
							alumno_id 	: $stateParams.id,
							numero 		: pago.no,
							semana 		: pago.numero,
							anio 		: pago.anio,
							estatus 	: 1,
							usuario_id 	: Meteor.userId(),
							importe 	: pago.pago
						});
						semanasPagadas.push({
							anio 	: pago.anio,
							numero 	: pago.numero,
							importe : pago.importe,
							pagada 	: 3,
							importe : pago.pago
						});
					}
				};
				
				for (var j = 0; j < rc.inscripciones[i].planPagoColegiatura.planPago.length; j++) {
					if(rc.inscripciones[i].planPagoColegiatura.planPago[j].pagada==2){
						rc.inscripciones[i].planPagoColegiatura.planPago[j].pagada=1;
						rc.inscripciones[i].planPagoColegiatura.planPago[j].pago=rc.inscripciones[i].planPagoColegiatura.cuota;
						
						var fechaActual = new Date();
  						var fechaCobro = new Date(rc.inscripciones[i].planPagoColegiatura.planPago[j].fecha);
  						var dias = Math.floor((fechaActual-fechaCobro) / (1000 * 60 * 60 * 24)); 
  						var diasDescuento = Math.floor((fechaCobro-fechaActual) / (1000 * 60 * 60 * 24)); 
  						console.log(dias,diasDescuento,(fechaActual-fechaCobro),(fechaCobro-fechaActual));
					
						for (var k = rc.inscripciones[i].planPagoColegiatura.recargos.length - 1; k >= 0; k--) {
							var recargo = rc.inscripciones[i].planPagoColegiatura.recargos[k];
							if(recargo.dias<dias){
			  					if(recargo.tipoRecargo=="Fijo"){
			  						rc.inscripciones[i].planPagoColegiatura.planPago[j].pago+=recargo.recargo;
			  					}
			  					else if (recargo.tipoRecargo=="Procentual") {
			  						rc.inscripciones[i].planPagoColegiatura.planPago[j].pago+=((recargo.recargo/100)*rc.inscripciones[i].planPagoColegiatura.cuota);
			  					};
			  				};
						};
						console.log(rc.inscripciones[i].planPagoColegiatura.descuentos);


						for (var k = rc.inscripciones[i].planPagoColegiatura.descuentos.length - 1; k >= 0; k--) {
							var descuento = rc.inscripciones[i].planPagoColegiatura.descuentos[k];
							console.log(descuento.dias,diasDescuento);
							if(descuento.dias<diasDescuento){
			  					if(descuento.tipoDescuento=="Fijo"){
			  						rc.inscripciones[i].planPagoColegiatura.planPago[j].pago-=descuento.descuento;
			  					}
			  					else if (descuento.tipoDescuento=="Procentual") {
			  						rc.inscripciones[i].planPagoColegiatura.planPago[j].pago-=((descuento.descuento/100)*rc.inscripciones[i].planPagoColegiatura.cuota);
			  					};
			  				};
						};

						var pago = rc.inscripciones[i].planPagoColegiatura.planPago[j];
						Pagos.insert({
							fechaPago 	: new Date(),
							alumno_id 	: $stateParams.id,
							numero 		: pago.no,
							semana 		: pago.numero,
							anio 		: pago.anio,
							estatus 	: 1,
							usuario_id 	: Meteor.userId(),
							importe 	: pago.pago
						});
						semanasPagadas.push({
							anio 	: pago.anio,
							numero 	: pago.numero,
							
							pagada 	: 3,
							importe : pago.pago
						});
					};
				};
				var _inscripcion = quitarhk(rc.inscripciones[i]);
				//console.log(rc.inscripciones[i]);
				//console.log(_inscripcion);
				var inscripcion_id=_inscripcion._id;
				delete _inscripcion._id;
				Inscripciones.update({_id:inscripcion_id},{$set:_inscripcion});


			};		  
			$state.go("anon.pagosImprimir",{semanas : semanasPagadas, id : $stateParams.id});  
		};
		rc.totalPagar = 0.00;
	}
  
}