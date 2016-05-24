angular
  .module('casserole')
  .controller('SubCiclosCtrl', SubCiclosCtrl);
 
function SubCiclosCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('subCiclos',()=>{
		return [{estatus:true}]
	 });


	this.subscribe('ciclos',()=>{
		return [{estatus:true}]
	 });

  this.helpers({
	  subCiclos : () => {
		  return SubCiclos.find();
	  },
	  ciclos : () => {
		  return Ciclos.find();
	  },
  });
  	  
  this.nuevo = true;	  
  this.nuevoSubCiclo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.subCiclo = {};		
  };
	
  this.guardar = function(subCiclo)
	{
		this.subCiclo.estatus = true;
		console.log(this.subCiclo);
		SubCiclos.insert(this.subCiclo);
		toastr.success('SubCiclo guardado.');
		this.subCiclo = {};
		$('.collapse').collapse('show');
		this.nuevo = true;
		$state.go('root.subCiclos');
	};
	
	this.editar = function(id)
	{
    this.subCiclo = SubCiclos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(subCiclo)
	{
		var idTemp = subCiclo._id;
		delete subCiclo._id;		
		SubCiclos.update({_id:idTemp},{$set:subCiclo});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.getCiclo= function(ciclo_id)
	{
		var ciclo = Ciclos.findOne(ciclo_id);
		if(ciclo)
		return ciclo.descripcion;
	};
		
	this.cambiarEstatus = function(id)
	{
		var subCiclo = SubCiclos.findOne({_id:id});
		if(subCiclo.estatus == true)
			subCiclo.estatus = false;
		else
			subCiclo.estatus = true;
		
		SubCiclos.update({_id:id}, {$set : {estatus : subCiclo.estatus}});
	};
	
};