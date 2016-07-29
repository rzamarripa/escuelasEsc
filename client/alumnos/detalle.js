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
		
	//dfs
	//deep first search

	this.totalPagar = 0.00;
	this.alumno = {};
	this.fechaActual = new Date();
	this.hayParaPagar = true;
	
	this.subscribe("ocupaciones",()=>{
		return [{estatus:true, campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }]
	 });

	this.subscribe('inscripciones', () => {
	    return [{
		    alumno_id : $stateParams.id,
		    campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : ""
	    }];
	  });
	this.subscribe('alumno', () => {
    return [{
	    id : $stateParams.id,
	    campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : ""
    }];
  });

	this.subscribe("grupos",() => {
	    return [{campus_id : Meteor.user() != undefined ? Meteor.user().profile.campus_id : "" }];
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

  
	this.actualizar = function(alumno,form)
	{
		if(form.$invalid){
	        toastr.error('Error al actualizar los datos del Alumno.');
	        return;
	    }
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
  
  this.periodoVisible = function(periodo){
  	for (var i = 0; periodo && periodo.datos && i < periodo.datos.length; i++) {
  		if(periodo.datos[i] && periodo.datos[i].activa )
  			return true;
  	}
  	return false;
  }
  
  this.calcularImporteU= function(datos,pago){
		//console.log(datos,pago)
		if(datos && datos.activa==false)
			return 0;
		//console.log(this.inscripcion);
		var fechaActual = new Date();
  		var fechaCobro = new Date(pago.fecha);
  		//console.log(fechaActual,fechaCobro);
  		var diasRecargo = Math.floor((fechaActual-fechaCobro) / (1000 * 60 * 60 * 24)); 
  		var diasDescuento = Math.floor((fechaCobro-fechaActual) / (1000 * 60 * 60 * 24)); 
  		var importe = datos.importe;
  		//console.log(diasRecargo,diasDescuento);
  		for (var i = 0; datos.procedimientos && i < datos.procedimientos.length; i++) {
  			
  			if(datos.procedimientos[i].tipoProcedimiento == 'Recargo' && diasRecargo >=datos.procedimientos[i].dias){
  			//	console.log('Recargo');
  				importe+=datos.procedimientos[i].monto;
  			}
  			if(datos.procedimientos[i].tipoProcedimiento == 'Descuento' && diasDescuento >=datos.procedimientos[i].dias){
  			//	console.log('Descuento');
  				importe-=datos.procedimientos[i].monto;
  			}
  		};
  		//console.log(importe);
  		return importe
	}	

  this.seleccionarSemana = function(cobro,plan){
	  //console.log(cobro);
	  //var semSel = cobro.anio + cobro.numero;	
	  rc.hayParaPagar = true;
	  rc.totalPagar=0;
	  for (var i = 0; i < cobro.no; i++) {
	  		if(plan.planPago[i].pagada!=1 && plan.planPago[i].pagada!=5 ){
	  			rc.hayParaPagar = false;
	  			plan.planPago[i].pagada =2;
	  			
	  			
  				//rc.totalPagar+=plan.cuota;
  				for (var j = 0; j < plan.datos.length; j++) {
  					rc.totalPagar +=this.calcularImporteU( plan.datos[j],plan.planPago[i]);
  					//console.log(rc.totalPagar);
  				}



	  		}
	  };
	  //console.log(rc.totalPagar);
	  for (var i = cobro.no; i < plan.planPago.length; i++) {
	  	if(plan.planPago[i].pagada!=1 & plan.planPago[i].pagada!=5){
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

  
  	this.obtenerEstatus = function(cobro,concepto){
  		
  		var fechaActual = new Date();
  		var fechaCobro = new Date(cobro.fecha);
  		var dias = Math.floor((fechaActual-fechaCobro) / (1000 * 60 * 60 * 24)); 
  		//console.log(dias,concepto)
  		//console.log(recargos);
  		//if(!recargos) recargos =[];
	  	if(cobro.pagada==1){
		  	return "bg-color-green txt-color-white";
	 	}
	 	else  if(cobro.pagada==2){
	 		return "bg-color-blue txt-color-white";
	 	}
	 	else if(cobro.pagada==5){
	 		return "bg-color-blueDark txt-color-white";
	 	}
	 	else {
	  		for (var i = 0; concepto && concepto.datos && i < concepto.datos.length; i++) {
	  			var procedimientos = concepto.datos[i].procedimientos;
	  			procedimientos = procedimientos? procedimientos:[];

	  			for (var j = 0;concepto.datos[i].activa && j < procedimientos.length; j++) {
	  				var procedimiento = procedimientos[i];
	  				if(procedimiento && procedimiento.dias<=dias && procedimiento.tipoProcedimiento=='Recargo')
	  					return "bg-color-orange txt-color-white";
	  			}
	  		}
	  			//console.log(dias,recargos[i].dias,cobro);
	  		//	if(recargos[i].dias<dias)
	  		//		return "bg-color-orange txt-color-white";
	  		//};

		  return "";
		}
  	}
  
  this.pagar = function(){
		if (confirm("Está seguro de realizar el cobro por $" + parseFloat(rc.totalPagar))) {
			var semanasPagadas = [];
			for (var i = 0; i < rc.inscripciones.length; i++) {
				var inscripcion=rc.inscripciones[i];
				console.log(inscripcion.plan)
				for(var idConcepto in inscripcion.plan){

					var concepto = inscripcion.plan[idConcepto];
					console.log(idConcepto)
					console.log(concepto)
					for (var j = 0; (idConcepto==inscripcion.tipoInscripcion || idConcepto==inscripcion.tipoColegiatura) &&concepto.planPago && j < concepto.planPago.length; j++) {
						var cobro =concepto.planPago[j];
						if(cobro.pagada==2){
							cobro.pagada = 1;
							cobro.pago = 0;
							for (var k = 0; k < concepto.datos.length  ; k++) {
								if(concepto.datos[k].activa){
				  					cobro.pago +=this.calcularImporteU( concepto.datos[k],cobro);
				  					console.log(cobro);
					  				Pagos.insert({
										fechaPago 	: new Date(),
										alumno_id 	: $stateParams.id,
										campus_id 	:Meteor.user().profile.campus_id,
										numero 		: cobro.no,
										semana 		: cobro.numero,
										anio 		: cobro.anio,
										estatus 	: 1,
										concepto 	: concepto.datos[k].nombre,
										tipo 		: "Cobro",
										usuario_id 	: Meteor.userId(),
										importe 	: concepto.datos[k].importe
									});
									semanasPagadas.push({
										fechaPago 	: new Date(),
										alumno_id 	: $stateParams.id,
										campus_id 	:Meteor.user().profile.campus_id,
										numero 		: cobro.no,
										semana 		: cobro.numero,
										anio 		: cobro.anio,
										estatus 	: 1,
										concepto 	: concepto.datos[k].nombre,
										tipo 		: "Cobro",
										usuario_id 	: Meteor.userId(),
										importe 	: concepto.datos[k].importe
									});
									var procedimientos= concepto.datos[k].procedimientos;
									var fechaActual = new Date();
							  		var fechaCobro = new Date(cobro.fecha);
							  		//console.log(fechaActual,fechaCobro);
							  		var diasRecargo = Math.floor((fechaActual-fechaCobro) / (1000 * 60 * 60 * 24)); 
							  		var diasDescuento = Math.floor((fechaCobro-fechaActual) / (1000 * 60 * 60 * 24));
									for (var l = 0; procedimientos && l < procedimientos.length; l++) {
										var procedimiento = procedimientos[l]
										if(procedimiento.tipoProcedimiento == 'Recargo' && diasRecargo >=procedimiento.dias){
	  										Pagos.insert({
												fechaPago 	: new Date(),
												alumno_id 	: $stateParams.id,
												numero 		: cobro.no,
												campus_id 	:Meteor.user().profile.campus_id,
												semana 		: cobro.numero,
												anio 		: cobro.anio,
												estatus 	: 1,
												concepto 	: concepto.datos[k].nombre+" - "+procedimiento.nombre,
												tipo 		: "Recargo",
												usuario_id 	: Meteor.userId(),
												importe 	: procedimiento.monto
											});
											semanasPagadas.push({
												fechaPago 	: new Date(),
												alumno_id 	: $stateParams.id,
												campus_id 	:Meteor.user().profile.campus_id,
												numero 		: cobro.no,
												semana 		: cobro.numero,
												anio 		: cobro.anio,
												estatus 	: 1,
												concepto 	: concepto.datos[k].nombre+" - "+procedimiento.nombre,
												tipo 		: "Recargo",
												usuario_id 	: Meteor.userId(),
												importe 	: procedimiento.monto
											});
	  									}
							  			if(procedimiento.tipoProcedimiento == 'Descuento' && diasDescuento >=procedimiento.dias){
							  				Pagos.insert({
												fechaPago 	: new Date(),
												alumno_id 	: $stateParams.id,
												campus_id 	:Meteor.user().profile.campus_id,
												numero 		: cobro.no,
												semana 		: cobro.numero,
												anio 		: cobro.anio,
												estatus 	: 1,
												concepto 	: concepto.datos[k].nombre+" - "+procedimiento.nombre,
												tipo 		: "Descuento",
												usuario_id 	: Meteor.userId(),
												importe 	: procedimiento.monto * (-1)
											});
											semanasPagadas.push({
												fechaPago 	: new Date(),
												alumno_id 	: $stateParams.id,
												campus_id 	:Meteor.user().profile.campus_id,
												numero 		: cobro.no,
												semana 		: cobro.numero,
												anio 		: cobro.anio,
												estatus 	: 1,
												concepto 	: concepto.datos[k].nombre+" - "+procedimiento.nombre,
												tipo 		: "Descuento",
												usuario_id 	: Meteor.userId(),
												importe 	: procedimiento.monto * (-1)
											});
							  			}

									}
								}
			  				}
						}
					}
				}
		
				var _inscripcion = quitarhk(inscripcion);
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