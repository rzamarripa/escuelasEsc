angular
  .module('casserole')
  .controller('AlumnosDetalleCtrl', AlumnosDetalleCtrl);
 
function AlumnosDetalleCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {

	$reactive(this).attach($scope);
	
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
			this.alumno.fotografia = data;
		});
	};
	
		
	this.totalPagado = function(){
	  var temp = 0.00;
	  _.each(this.misPagos, function(pago){	
		  temp += parseFloat(pago.importe);		
	  });
	  return temp;
  }
}