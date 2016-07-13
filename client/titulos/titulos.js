angular
  .module('casserole')
  .controller('TitulosCtrl', TitulosCtrl);
 
function TitulosCtrl($scope, $meteor, $reactive, $state, toastr) {
	$reactive(this).attach($scope);

  this.subscribe("titulos",()=>{
		return [{estatus:true, campus_id : Meteor.user().profile.campus_id }]
	 });

  this.action = true;  
	this.nuevo = true;
	
  this.helpers({
	  titulos : () => {
		  return Titulos.find();
	  }
  });

  this.nuevoTitulo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.titulo = {}; 
	};
  
  this.guardar = function(titulo,form)
	{
		if(form.$invalid){
	        toastr.error('Error al guardar los datos del Título.');
	        return;
	    }
		this.titulo.estatus = true;
		this.titulo.campus_id = Meteor.user().profile.campus_id;
		Titulos.insert(this.titulo);
		toastr.success('Titulo guardado.');
		this.titulo = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
		$state.go('root.titulos');
		
	};
	
	this.editar = function(id)
	{
		this.titulo = Titulos.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
		
	};
	
	this.actualizar = function(titulo,form)
	{
		if(form.$invalid){
	        toastr.error('Error al actualizar los datos del Título.');
	        return;
	    }
		var idTemp = titulo._id;
		delete titulo._id;		
		Titulos.update({_id:idTemp},{$set:titulo});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		form.$setPristine();
        form.$setUntouched();
		
	};

	this.cambiarEstatus = function(id)
	{
		var ciclo = Ciclos.findOne({_id:id});
		if(ciclo.estatus == true)
			ciclo.estatus = false;
		else
			ciclo.estatus = true;
		
		Ciclos.update({_id:id}, {$set : {estatus : ciclo.estatus}});
		
		var titulo = $meteor.object(Titulos, id, false);
		if(titulo.estatus == true)
			titulo.estatus = false;
		else
			titulo.estatus = true;
		
		titulo.save();
    };
		
}