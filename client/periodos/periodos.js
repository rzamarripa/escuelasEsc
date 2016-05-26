angular
  .module('casserole')
  .controller('PeriodosCtrl', PeriodosCtrl);
 
function PeriodosCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);
	
  this.action = true;
  this.nuevo = true;	  
  this.tipoFormulario = "";
  this.periodo = {};	
  this.periodo.planPago = [];
	
	this.subscribe('periodos',()=>{
		return [{estatus:true}]
	 });

	this.subscribe('subCiclos',()=>{
		return [{estatus:true}]
	 });

  this.helpers({
	  subCiclos : () => {
		  return SubCiclos.find();
	  },
	  periodos : () => {
		  return Periodos.find();
	  },
  });  	  
  
  this.nuevoPeriodo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.periodo = {};		
  };
	
  this.guardar = function(periodo)
	{
		periodo.estatus = true;
		_.each(periodo.planPago, function(pago){
			delete pago.$$hashKey;
		});
		Periodos.insert(periodo);
		toastr.success('Periodo guardado.');
		this.periodo = {};
		$('.collapse').collapse('show');
		this.nuevo = true;
	};
	
	this.editar = function(id)
	{
    this.periodo = Periodos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(periodo)
	{
		var idTemp = periodo._id;
		delete periodo._id;
		_.each(periodo.planPago, function(pago){
			delete pago.$$hashKey;
		});
		Periodos.update({_id:idTemp},{$set:periodo});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.getSubCiclo= function(subCiclo_id)
	{
		var subCiclo = SubCiclos.findOne(subCiclo_id);
		if(subCiclo)
		return subCiclo.descripcion;
	};
		
	this.cambiarEstatus = function(id)
	{
		var periodo = SubCiclos.findOne({_id:id});
		if(periodo.estatus == true)
			periodo.estatus = false;
		else
			periodo.estatus = true;
		
		Periodos.update({_id:id}, {$set : {estatus : periodo.estatus}});
	};
	
	this.planPagos = function(subCiclo){
		var sub = SubCiclos.findOne(subCiclo.subCiclo_id);
		if(sub.tipo === "Administrativo"){
			rc.tipoFormulario = "administrativo";
		}else if(sub.tipo === "Academico"){
			rc.tipoFormulario = "academico";
		}
	}
	
	this.generar = function(periodo){
		console.log(periodo);
		
		var diaInicio = periodo.fechaInicio.getDate();
		var mesInicio = periodo.fechaInicio.getMonth();
		mesInicio++;
		var anioInicio = periodo.fechaInicio.getFullYear();
		var fechaInicio = anioInicio + "-" + mesInicio + "-" + diaInicio;
		var fechaInicial = moment(fechaInicio);
		
		var diaFinal = periodo.fechaFin.getDate();
		var mesFinal = periodo.fechaFin.getMonth();
		mesFinal++;
		var anioFinal = periodo.fechaFin.getFullYear();
		var fechaFin = anioFinal + "-" + mesFinal + "-" + diaFinal;
		var fechaFinal = moment(fechaFin);
		
	  var plazo = "";
	  if(periodo.plazo == "Semanal"){
		  plazo = 'week';
		  aumento = 'weeks';
	  }else if(periodo.plazo == "Mensual"){
		  plazo = 'month';
		  aumento = 'months';
	  }
	  
	  var cant = fechaFinal.diff(fechaInicial, plazo);
	  plazos = [];
	  rc.periodo.planPago = [];
	  for(var j=1; j<= cant; j++){
		  var elAnio = fechaInicial.year();
		  var numero = "";		  
		  if(plazo == 'week')
		  	numero = moment(fechaInicial).week();
		  else if(plazo == 'month')
		  	numero = moment(fechaInicial).month() + 1;
		  var objeto = {no: j, numero : numero, pagada : 0, anio : elAnio };
		  rc.periodo.planPago.push(angular.copy(objeto));
		  
		  fechaInicial.add(1, aumento);
	  }
	  console.log(rc.periodo.planPago);
	}
	
};