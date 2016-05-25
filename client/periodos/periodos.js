angular
  .module('casserole')
  .controller('PeriodosCtrl', PeriodosCtrl);
 
function PeriodosCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
  this.action = true;
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
  	  
  this.nuevo = true;	  
  this.nuevoPeriodo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.periodo = {};		
  };
	
  this.guardar = function(periodo)
	{
		this.periodo.estatus = true;
		console.log(this.periodo);
		Periodos.insert(this.periodo);
		toastr.success('Periodo guardado.');
		this.periodo = {};
		$('.collapse').collapse('show');
		this.nuevo = true;
		$state.go('root.Periodos');
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
		SubCiclos.update({_id:idTemp},{$set:periodo});
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
	
};