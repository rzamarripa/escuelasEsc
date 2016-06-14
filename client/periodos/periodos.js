angular
  .module('casserole')
  .controller('PeriodosCtrl', PeriodosCtrl);
 
function PeriodosCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);
	
  	this.action = true;
  	this.nuevo = true;	  
  
  	this.periodo = {};	
  	this.periodo.planPago = [];
  	this.periodo.recargos = [];
  	this.tipoFormulario ="";

	this.subscribe('periodos',()=>{
		return [{estatus:true}]
	});

	this.subscribe('subCiclos',()=>{
		return [{estatus:true,ciclo_id:this.getReactively('periodo.ciclo_id')}]
	});
	this.subscribe('ciclos',()=>{
		return [{estatus:true}]
	});

  	this.helpers({
	  	subCiclos : () => {
		  	return SubCiclos.find();
	 	},
	  	periodos : () => {
		  	return Periodos.find();
	  	},
	  	ciclos : () =>{
	  		return Ciclos.find();
	  	}, 
  	});  	  


  	this.autorun(() => {
	  	var sub=undefined;
	  	//console.log("hola",this.getReactively("periodo.subCiclo_id"));
	  	if(this.getReactively("periodo.subCiclo_id"))
			sub = SubCiclos.findOne(this.getReactively("periodo.subCiclo_id"));
	  	if(!sub)
	  		this.tipoFormulario = "no se";	  
		else if(sub.tipo === "Administrativo")
			this.tipoFormulario = "administrativo";
		else if(sub.tipo === "Academico")
			this.tipoFormulario = "academico";
		
  	});

  
 	this.nuevoPeriodo = function()
  	{
    	this.action = true;
    	this.nuevo = !this.nuevo;
    	this.periodo = {};		
  	};
	
  	this.guardar = function(periodo)
	{
		var sub = SubCiclos.findOne(this.periodo.subCiclo_id);
		if(sub && sub.tipo === "Administrativo")
			this.generar(periodo);

		periodo.estatus = true;
		console.log(periodo);
		_.each(periodo.planPago, function(pago){
			delete pago.$$hashKey;
		});
		_.each(periodo.recargos, function(recargo){
			delete recargo.$$hashKey;
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
    	console.log(this.tipoFormulario);
    	this.action = false;
    	$('.collapse').collapse('show');
    	this.nuevo = false;
	};
	
	this.actualizar = function(periodo)
	{
		var idTemp = periodo._id;
		delete periodo._id;
		var sub = SubCiclos.findOne(this.periodo.subCiclo_id);
		if(sub && sub.tipo === "Administrativo")
			this.generar(periodo);
		_.each(periodo.planPago, function(pago){
			delete pago.$$hashKey;
		});
		_.each(periodo.recargos, function(recargo){
			delete recargo.$$hashKey;
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
	
	/*this.planPagos = function(subCiclo){
		var sub = SubCiclos.findOne(subCiclo.subCiclo_id);
		if(sub.tipo === "Administrativo"){
			rc.tipoFormulario = "administrativo";
		}else if(sub.tipo === "Academico"){
			rc.tipoFormulario = "academico";
		}
	}*/

	this.nuevoRecargo = function(){
		if(!this.periodo)
			this.periodo={};
		if(!this.periodo.recargos)
			this.periodo.recargos=[];
		this.periodo.recargos.push({});
	}
	this.eliminarRecargo = function(recargo){
		if(!this.periodo)
			this.periodo={};
		if(!this.periodo.recargos)
			this.periodo.recargos=[];
		console.log();
		var itemToDelete = this.periodo.recargos.indexOf(recargo);
		if(itemToDelete>=0)
			this.periodo.recargos.splice(itemToDelete,1);
	}
	
	this.generar = function(periodo){
		var periodo = this.periodo;
		console.log(periodo);
		
		var diaInicio = periodo.fechaInicio.getDate();
		var mesInicio = periodo.fechaInicio.getMonth();
		mesInicio++;
		var anioInicio = periodo.fechaInicio.getFullYear();
		var fechaInicio = anioInicio + " " + mesInicio + " " + diaInicio;
		var fechaInicial = moment(fechaInicio,"YYYY MM DD");
		
		var diaFinal = periodo.fechaFin.getDate();
		var mesFinal = periodo.fechaFin.getMonth();
		mesFinal++;
		var anioFinal = periodo.fechaFin.getFullYear();
		var fechaFin = anioFinal + " " + mesFinal + " " + diaFinal;
		var fechaFinal = moment(fechaFin, "YYYY MM DD");
		
	  	var plazo = "";
	  	if(periodo.plazo == "Semanal"){
		  	plazo = 'week';
		  	aumento = 'weeks';
	  	}else {
		  	plazo = 'month';
		  	aumento = 'months';
	  	}
	  
	  	var cant = fechaFinal.diff(fechaInicial, plazo);
	  	console.log(cant);
	  	
	  	switch (periodo.plazo){
		  	case "Bimestral":
		  		cant = ((cant%2)? cant+1:cant)/2;
		  		break;
		  	case "Trimestral":
		  		cant = ((cant%3)? cant+1:cant)/3;
		  		break;
		  	case "Tetramestral":
		  		cant = ((cant%4)? cant+1:cant)/4;
		  		break;
		  	case "Semestral":
		  		cant = ((cant%6)? cant+1:cant)/6;
		  		break;
		  	case "Anual":
		  		cant = ((cant%12)? cant+1:cant)/12;
		  		break;
		}

	  	console.log(cant);
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
		  	switch (periodo.plazo){
		  		case "Semanal":
		  		case "Mensual":
		  			fechaInicial.add(1, aumento);
		  			break;
		  		case "Bimestral":
		  			fechaInicial.add(2, aumento);
		  			break;
		  		case "Trimestral":
		  			fechaInicial.add(3, aumento);
		  			break;
		  		case "Tetramestral":
		  			fechaInicial.add(4, aumento);
		  			break;
		  		case "Semestral":
		  			fechaInicial.add(6, aumento);
		  			break;
		  		case "Anual":
		  			fechaInicial.add(12, aumento);
		  			break;
		  	}	  
		  		  	
	  	}
	  	console.log(rc.periodo.planPago);
	}
	
};