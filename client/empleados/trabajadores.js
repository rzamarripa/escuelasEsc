angular
.module("casserole")
.controller("TrabajadoresCtrl", TrabajadoresCtrl);
function TrabajadoresCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {
$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('trabajadores');
	//this.subscribe('deptosAcademicos');
 
  this.helpers({
	  trabajadores : () => {
		  return Trabajadores.find();
	  },
	 //  deptosAcademicos : () => {
		//  return DeptosAcademicos.find();
	  //},
  });
  
  this.nuevo = true;  
  this.nuevoTrabajador = function()
  {
	this.action = true;
    this.nuevo = !this.nuevo;
    this.trabajador = {}; 
  };
 
	this.guardar = function(trabajador)
	{
		Accounts.createUser({
			username: this.trabajador.nombreUsuario,
			password: this.trabajador.contrasena,
			profile: {
				 nombre: this.trabajador.nombre,
				 apellidos: this.trabajador.apPaterno + " " + this.trabajador.apMaterno,
				 tipoUsuario: "Trabajador"
			},function(err) {
				if (err)
				   console.log(err);
				  else
				    console.log('success!');
				}
		});
		this.trabajador.estatus = true;
		console.log(this.trabajador);
		Trabajadores.insert(this.trabajador);
		toastr.success('Trabajador guardado.');
		this.trabajador = {};
		$('.collapse').collapse('show');
		this.nuevo = true;
		$state.go('root.trabajadores');
		
	};
	
	this.editar = function(id)
	{
    this.trabajador = Trabajadores.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(trabajador)
	{
		var idTemp = trabajador._id;
		delete trabajador._id;		
		Trabajadores.update({_id:idTemp},{$set:trabajador});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
		
	this.cambiarEstatus = function(id)
	{
		var trabajador = Trabajadores.findOne({_id:id});
		if(trabajador.estatus == true)
			trabajador.estatus = false;
		else
			trabajador.estatus = true;
		
		Trabajadores.update({_id:id}, {$set : {estatus : trabajador.estatus}});
	};

	 this.tomarFoto = function(){
		$meteor.getPicture().then(function(data){
			this.trabajador.fotografia = data;
		});
	};

/*
  this.tieneFoto = function(trabajador){
		if (typeof trabajador.fotografia !== "undefined")
			return true;
		else
			return false;
	}	
*/
};