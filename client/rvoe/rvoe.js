angular
  .module('casserole')
  .controller('RvoeCtrl', RvoeCtrl);
 
function RvoeCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('rvoe',()=>{
		return [{estatus:true}]
	 });
  
  this.helpers({
	  rvoes : () => {
		  return Rvoe.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoRvoe = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.rvoe = {};		
  };
	
  this.guardar = function(rvoe)
	{
		this.rvoe.estatus = true;
		console.log(this.rvoe);
		Rvoe.insert(this.rvoe);
		toastr.success('Rvoe guardado.');
		this.rvoe = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.rvoe');
	};
	
	this.editar = function(id)
	{
    this.rvoe = Rvoe.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(rvoe)
	{
		var idTemp = rvoe._id;
		delete rvoe._id;		
		Rvoe.update({_id:idTemp},{$set:rvoe});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
		
	this.cambiarEstatus = function(id)
	{
		var rvoe = Rvoe.findOne({_id:id});
		if(rvoe.estatus == true)
			rvoe.estatus = false;
		else
			rvoe.estatus = true;
		
		Rvoe.update({_id:id}, {$set : {estatus : rvoe.estatus}});
	};
	
};