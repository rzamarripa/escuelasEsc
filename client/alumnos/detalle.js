angular
  .module('casserole')
  .controller('AlumnosDetalleCtrl', AlumnosDetalleCtrl);
 
function AlumnosDetalleCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {

	rc = $reactive(this).attach($scope);
	this.totalPagar = 0.00;
	this.alumno = {};
	this.fechaActual = new Date();
	
	this.subscribe("ocupaciones");
	
	this.subscribe('alumno', () => {
    return [{
	    id : $stateParams.id
    }];
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
		  return Pagos.find().fetch();
	  },
	  misSemanas : () => {
		  var hoy = new Date();
		  var mesAtras = moment().subtract(1, "month");
		  var primerSemana = moment(mesAtras).week();
		  var anio = moment(mesAtras).year();
		  console.log(anio);
		  semanas = [];
		  for(var i=primerSemana; i <= 52; i++){
			  semanas.push({numero : i, pagada : 0, });
		  }
			_.each(this.getReactively('misPagos'), function(pago){
				_.each(semanas, function(semana){
					if(semana.numero == pago.semana){
						semana.pagada = 1;
					}
				});
			});
			return semanas;
	  }
  });
  
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
  
  this.seleccionarSemana = function(semanaSeleccionada){
	  
	  _.each(rc.misSemanas, function(semana){
		  if(semana.numero <= semanaSeleccionada.numero && semana.pagada == 0){
			  rc.totalPagar += 350.00;
			  semana.pagada = 2;
		  }else if(semana.numero >= semanaSeleccionada.numero && semana.pagada == 2){
			  rc.totalPagar -= 350.00;
			  semana.pagada = 0;
		  }
	  });
  }
  
  this.obtenerEstatus = function(pagada){
	  if(pagada === 1){
		  return "bg-color-green";
	  }else if(pagada === 0){
		  return "";
	  }else if(pagada === 2){
		  return "bg-color-orange";
	  }
  }
  
  this.pagar = function(){
	  console.log("hola");
	  _.each(rc.misSemanas, function(semana){
		  
		  if(semana.pagada === 2){
			  console.log(semana);

			  Pagos.insert({
				  fechaPago : new Date(),
				  alumno_id : $stateParams.id,
				  semana : semana.numero,
				  estatus : 1,
				  usuario_id : Meteor.userId(),
				  importe : 350
			  });
		  }
	  });
	  rc.totalPagar = 0.00;
  }
}